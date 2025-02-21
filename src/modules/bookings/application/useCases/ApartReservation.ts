import { inject, injectable } from "inversify";
import { BOOKING_TYPES } from "../../infrastructure/types";
import { Booking } from "../../domain/Booking.entity";
import { validateModel } from "../../../../core/infrastructure/validators/validateModel";
import { BookingRepository } from "../../infrastructure/bookingRepository";
import { User } from "../../../users/domain/User.entity";
import { RESERVATION_TYPES } from "../../../reservations/infrastructure/types";
import { ReservationRepository } from "../../../reservations/infrastructure/reservationRepository";
import { Reservation } from "../../../reservations/domain/Reservation.entity";
import { ReservedHoursDto } from "../../../reservations/domain/dtos";
import UseCaseFindBookings from "./Find";

@injectable()
export default class SaveOne {
    constructor(
        @inject(BOOKING_TYPES.REPOSITORY) 
        private readonly bookingRepository: BookingRepository,
        @inject(BOOKING_TYPES.FIND)
        private readonly useCaseFindBookings: UseCaseFindBookings,
        @inject(RESERVATION_TYPES.REPOSITORY)
        private readonly reservationRepository: ReservationRepository
    ) {}

    async exec(body: Booking, userLogged: Partial<User>) {
        const booking = await validateModel(body, Booking);
        const reservationToday = await this.useCaseFindBookings.findReservationNow(userLogged);
        if(!reservationToday) throw new Error("Any Reservation was created yet, ensure to create one");
        const reservation = await this.addBookingInReservation(reservationToday, booking)
        const bookingCreated = await this.handleRelationBookingReservationAndSave(booking)
        return bookingCreated;
    }

    async addBookingInReservation(reservationToday: Reservation, booking: Booking){
        const reserved: ReservedHoursDto = { hour_end: booking.hour_end ,hour_start: booking.hour_start }
        reservationToday.reserved_hour = reserved
        return await this.reservationRepository.save(reservationToday)
    }

    async handleRelationBookingReservationAndSave(
        booking: Booking,
        // reservation: Reservation
    ) {
        // booking.reservation = reservation;
        return await this.bookingRepository.save(booking);
    }
}

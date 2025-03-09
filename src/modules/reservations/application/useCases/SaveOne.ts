import { inject, injectable } from "inversify";
import { RESERVATION_TYPES } from "../../infrastructure/types";
import { Reservation } from "../../domain/Reservation.entity";
import { validateModel } from "../../../../core/infrastructure/validators/validateModel";
import { ReservationRepository } from "../../infrastructure/reservationRepository";
import { User } from "../../../users/domain/User.entity";
import { USER_TYPES } from "../../../users/infrastructure/types";
import { UserRepository } from "../../../users/infrastructure/usersRepository";
import { BookingRepository } from "../../../bookings/infrastructure/bookingRepository";
import { Booking } from "../../../bookings/domain/Booking.entity";
import { ReservedHoursDto } from "../../domain/dtos";
import { ReservationSave } from "../../domain/dtos/reservation-save.dto";
import { BOOKING_TYPES } from "../../../bookings/infrastructure/types";
import moment from "moment";

@injectable()
export default class SaveOne {
    user: User = null;
    slot: Booking = null;
    constructor(
        @inject(RESERVATION_TYPES.REPOSITORY) 
        private readonly reservationRepository: ReservationRepository,
        @inject(BOOKING_TYPES.REPOSITORY) 
        private readonly bookingsRepository: BookingRepository,
        @inject(USER_TYPES.REPOSITORY) 
        private readonly userRepository: UserRepository
    ) {}
    async exec(body: ReservationSave, userLogged: Partial<User>) {
        const { booking_id, reservation } = await validateModel(body, ReservationSave);
        this.user = await this.findLoggedUser(userLogged)
        await this.validateMaxQuantityOfReservedSlots();
        this.slot = await this.findChosenBooking(booking_id)
        const new_reservation = this.handleSaveReservation({ reservation, user: this.user, booking: this.slot })
        return new_reservation;
    }
    async validateMaxQuantityOfReservedSlots() {
        const dateToday = moment().format("YYYY-MM-DD");
        //* with reservationRepo
        const reservationsOfUser = await this.reservationRepository.find({
            relations: { user: true },
            where: { user: { id: this.user.id } },
        });
        const reservedToday = reservationsOfUser.filter(res => {
            const date = moment(res.created_at).format("YYYY-MM-DD");
            return dateToday === date;
        })
        // si tuvieramos un campo para limitar cantidad de slots lo pondriamos en la condicion
        if(reservedToday.length > 3) throw new Error("fatal error, user did more than 3 reservations today, a vulnerability was found");
        if(reservedToday.length === 3) throw new Error("You can't make more than 3 reservations per day");
    }
    // verificar si el usuario hace una reserva de la misma hora y dia 
    verifySameDayAndHourAndFullSlot(slot: Booking) {
        const dateToday = moment().format("YYYY-MM-DD");
        const [ hour, _minutes ] = moment().format("HH:mm").split(":");
        const reservationsToday = slot.reservation.filter((res) => {
            const date = moment(res.created_at).format("YYYY-MM-DD");
            return date === dateToday
        });
        const userAlreadyApartedSlot = reservationsToday.find((res) =>  res.user.id === this.user.id);
        if(Number(hour) === slot.hour_start) throw new Error("You can't make a reservation because this slot already started");
        if(Number(hour) > slot.hour_start) throw new Error("You can't make a reservation because this slot has finished");
        if(userAlreadyApartedSlot) throw new Error("You can't make a reservation at the same hour twice");
        if(reservationsToday.length === 5) throw new Error(`The slot is full, you can't make a reservation`);
        return slot;
    }
    async findChosenBooking(booking_id: number) {
        let booking = await this.bookingsRepository.find({
            where: { id: booking_id }, 
            relations: { reservation: { user: true } }
        });
        if(booking.length > 1) throw new Error(`Error in the search, not bookings with ( id: ${booking_id} )`);
        let slot = booking[0];
        slot = this.verifySameDayAndHourAndFullSlot(slot)
        return slot;
    }
    async findLoggedUser(userLogged: Partial<User>) {
        const [ user ] = await this.userRepository.query(`SELECT * FROM users WHERE id = ${userLogged.id};`)
        if(!user) throw new Error("User doesn't not exist")
        return user
    }
    async handleSaveReservation({reservation, user, booking}: { reservation: Reservation, user: User, booking: Booking }) {
        const reserved: ReservedHoursDto = { 
            hour_end: booking.hour_end,
            hour_start: booking.hour_start 
        };
        reservation.reserved_hour = reserved;
        reservation.user = user;
        reservation.booking = booking;
        const reservationCreated = await this.reservationRepository.save(reservation);
        // delete reservationCreated.user;
        delete reservationCreated.user.password
        delete reservationCreated.booking;
        return reservationCreated;
    }
}

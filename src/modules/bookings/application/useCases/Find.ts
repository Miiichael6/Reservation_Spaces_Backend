import { inject, injectable } from "inversify";
import { BOOKING_TYPES } from "../../infrastructure/types";
import { RESERVATION_TYPES } from "../../../reservations/infrastructure/types";
import { ReservationRepository } from "../../../reservations/infrastructure/reservationRepository";
import { BookingRepository } from "../../infrastructure/bookingRepository";
import { Reservation } from "../../../reservations/domain/Reservation.entity";
import { User } from "../../../users/domain/User.entity";

@injectable()
export default class Find {
  constructor(
    @inject(BOOKING_TYPES.REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    @inject(RESERVATION_TYPES.REPOSITORY)
    private readonly reservationRepository: ReservationRepository
  ) {}

  async exec(userLogged: Partial<User>) {
    const reservation = await this.findReservationNow(userLogged);
    if (!reservation) throw new Error("An Error in execution, while searching booking");
    const booking = await this.findBooking(reservation);
    return booking;
  }

  async findBooking(reservation: Reservation) {
    return await this.bookingRepository.query(`
            SELECT * FROM "bookings"
            WHERE reservation_id=${reservation.id}
        `);
  }

  async findReservationNow(userLogged: Partial<User>) {
    const dateNow = new Date();
    const reservations: Reservation[] = await this.reservationRepository.query(`
            SELECT * FROM "reservations"
            WHERE user_id=${userLogged.id}
        `);
    const reservationNow: Reservation = reservations.find((res) => {
      return this.getYearMonthDay(res.created_at) === this.getYearMonthDay(dateNow);
    });
    return reservationNow;
  }

  getYearMonthDay(fecha: string | Date) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Agrega 0 si es necesario
    const day = date.getDate().toString().padStart(2, "0"); // Agrega 0 si es necesario
    return `${year}-${month}-${day}`;
  }
}

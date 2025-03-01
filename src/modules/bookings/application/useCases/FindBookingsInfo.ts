import { inject, injectable } from "inversify";
import { BOOKING_TYPES } from "../../infrastructure/types";
import { BookingRepository } from "../../infrastructure/bookingRepository";
import { User } from "../../../users/domain/User.entity";
import { Booking } from "../../domain/Booking.entity";
import moment from "moment";

@injectable()
export default class FindBookingsInfo {
  dayToday = moment().format("YYYY-MM-DD");
  hourToday = moment().format("HH:mm");
  constructor(
    @inject(BOOKING_TYPES.REPOSITORY)
    private readonly bookingRepository: BookingRepository
  ) {}

  async run(userLogged: Partial<User>) {
    const bookings = await this.bookingRepository.find({
      order: { hour_start: 1 },
      relations: { reservation: { user: true } },
    });
    const response = this.mapFinalResponse(bookings);
    const bookingsFinal = this.getUsersThatReservedToday(response)
    return bookingsFinal;
  }

  async getUsersThatReservedToday(bookings: Booking[]) {
    return bookings.map((el) => {
      el.reservation = el.reservation.filter(i=> moment(i.created_at).format("YYYY-MM-DD") === this.dayToday)
      return el;
    })
  }

  private mapFinalResponse (bookings: Booking[]) {
    return bookings.map((i) => {
        const reservation = i.reservation.map((res)=>{
            delete res.user.password;
            delete res.user.reservations;
            return res;
        })
        return { ...i, reservation }
    })
  }
}

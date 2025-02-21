import { inject, injectable } from "inversify";
import { BOOKING_TYPES } from "../../infrastructure/types";
import { BookingRepository } from "../../infrastructure/bookingRepository";
import { Reservation } from "../../../reservations/domain/Reservation.entity";
import { User } from "../../../users/domain/User.entity";
import { Booking } from "../../domain/Booking.entity";

@injectable()
export default class FindBookingsInfo {
  constructor(
    @inject(BOOKING_TYPES.REPOSITORY)
    private readonly bookingRepository: BookingRepository
  ) {}

  async run(userLogged: Partial<User>) {
    const bookings = await this.bookingRepository.find({
      relations: {
        reservation: {
            user: true,
        },
      },
    });
    const response = this.mapFinalResponse(bookings);
    return response;
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

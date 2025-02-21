import { inject, injectable } from "inversify";
import { BOOKING_TYPES } from "../../infrastructure/types";
import { Booking } from "../../domain/Booking.entity";
import { validateModel } from "../../../../core/infrastructure/validators/validateModel";
import { BookingRepository } from "../../infrastructure/bookingRepository";

@injectable()
export default class UpdateOneBooking {
    constructor(
        @inject(BOOKING_TYPES.REPOSITORY) 
        private readonly bookingRepository: BookingRepository,
    ) {}

    async exec(body: Booking) {
        const booking = await validateModel(body, Booking);
        const toUpdate = {
            filter: { id: booking.id },
            update: { coach: booking.coach }
        }
        const bookingUpdated = await this.bookingRepository.update(toUpdate.filter, toUpdate.update)
        return bookingUpdated;
    }

}

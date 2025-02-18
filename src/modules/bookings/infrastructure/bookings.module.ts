import { AsyncContainerModule } from "inversify";
import SaveOne from "../application/useCases/SaveOne";
import Find from "../application/useCases/Find";
import { BOOKING_TYPES } from "./types";
import { bookingRepository, BookingRepository } from "./bookingRepository";

export const container = new AsyncContainerModule(async (bind) => {
    bind<BookingRepository>(BOOKING_TYPES.REPOSITORY).toConstantValue(bookingRepository)
    bind<SaveOne>(BOOKING_TYPES.SAVE_ONE).to(SaveOne);
    bind<Find>(BOOKING_TYPES.FIND).to(Find);
});
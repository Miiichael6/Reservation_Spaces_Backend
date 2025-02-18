import { AsyncContainerModule } from "inversify";
import SaveOne from "../application/useCases/SaveOne";
import Find from "../application/useCases/Find";
import UpdateOne from "../application/useCases/UpdateOne";
import { RESERVATION_TYPES } from "./types";
import { reservationRepository, ReservationRepository } from "./reservationRepository";

export const container = new AsyncContainerModule(async (bind) => {
    bind<ReservationRepository>(RESERVATION_TYPES.REPOSITORY).toConstantValue(reservationRepository)
    bind<SaveOne>(RESERVATION_TYPES.SAVE_ONE).to(SaveOne);
    bind<Find>(RESERVATION_TYPES.FIND).to(Find);
    bind<UpdateOne>(RESERVATION_TYPES.UPDATE_ONE).to(UpdateOne);
});
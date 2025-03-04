import { inject, injectable } from "inversify";
import { RESERVATION_TYPES } from "../../infrastructure/types";
import { ReservationRepository } from "../../infrastructure/reservationRepository";
import { ReservationDelete } from "../../domain/dtos/reservation-delete.dto";
import { validateModel } from "@/core/infrastructure/validators/validateModel";

@injectable()
export default class QuitReservation {
    constructor(
        @inject(RESERVATION_TYPES.REPOSITORY) 
        private readonly reservationRepository: ReservationRepository,
    ) {}

    async exec(deleteBody: ReservationDelete) {
        const body = await validateModel(deleteBody, ReservationDelete)
        const reservationDeleted = await this.reservationRepository.delete({ id: body.reservation_id });
        if(!reservationDeleted) throw { msg: "Error", detail: "pruebas de error" }
        return reservationDeleted;
    }
}

import { inject, injectable } from "inversify";
import { RESERVATION_TYPES } from "../../infrastructure/types";
import { Reservation } from "../../domain/Reservation.entity";
import { ReservationRepository } from "../../infrastructure/reservationRepository";

@injectable()
export default class UpdateOne {
    constructor(
        @inject(RESERVATION_TYPES.REPOSITORY) 
        private readonly reservationRepository: ReservationRepository
    ) {}

    async exec(reservation: Reservation) {
        const reservationUpdated = await this.reservationRepository.save(reservation);
        const findReservation = await this.reservationRepository.findOne({ where: { id: reservationUpdated.id } })
        if(!findReservation) throw { msg: "Error", detail: "pruebas de error" }
        return findReservation;
    }
}

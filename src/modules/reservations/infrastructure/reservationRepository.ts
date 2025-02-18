import { DataSource, Repository } from "typeorm";
import { Reservation } from "../domain/Reservation.entity";
import { container as globalContainer } from "../../../server/globalContainer";

export interface ReservationRepository extends Repository<Reservation> {}
export const reservationRepository: ReservationRepository = globalContainer.get<DataSource>("PgRepository").getRepository(Reservation)
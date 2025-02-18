import { DataSource, Repository } from "typeorm";
import { Booking } from "../domain/Booking.entity";
import { container as globalContainer } from "../../../server/globalContainer";

export interface BookingRepository extends Repository<Booking> {}
export const bookingRepository: BookingRepository = globalContainer.get<DataSource>("PgRepository").getRepository(Booking)
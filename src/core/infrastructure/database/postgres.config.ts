import { DataSource } from "typeorm";
import { Booking } from "../../../modules/bookings/domain/Booking.entity";
import { User } from "../../../modules/users/domain/User.entity";
import { Reservation } from "../../../modules/reservations/domain/Reservation.entity";

const { PG_DATABASE, PG_PASSWORD, PG_USERNAME, PG_HOST, PG_PORT, NODE_ENV } = process.env;
export const AppDataSource = new DataSource({
  type: "postgres",
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  synchronize: NODE_ENV !== "production",
  ssl: NODE_ENV === "production",
  entities: [ Reservation, User, Booking ],
  logging: false // borrar la consola que pone en la terminal
});
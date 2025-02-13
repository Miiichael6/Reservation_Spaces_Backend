
import { DataSource } from "typeorm";
import { User } from "../../../modules/users/domain/User.entity"

const { PG_DATABASE, PG_PASSWORD, PG_USERNAME, PG_HOST, PG_PORT } = process.env;
export const AppDataSource = new DataSource({
  type: "postgres",
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  synchronize: true,
  ssl: true,
  entities: [User],
  logging: false // borrar la consola que pone en la terminal
});
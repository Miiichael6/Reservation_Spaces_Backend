
import { DataSource } from "typeorm";
import { User } from "../../../modules/users/domain/User.entity"

const { PG_DATABASE, PG_PASSWORD, PG_USERNAME } = process.env;
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  synchronize: true,
  entities: [User],
  logging: false // borrar la consola que pone en la terminal
});
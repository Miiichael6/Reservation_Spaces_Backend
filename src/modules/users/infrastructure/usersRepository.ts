import { DataSource, Repository } from "typeorm";
import { User } from "../domain/User.entity";
import { container as globalContainer } from "../../../server/globalContainer";

export interface UserRepository extends Repository<User> {}
export const userRepository: UserRepository = globalContainer.get<DataSource>("PgRepository").getRepository(User)
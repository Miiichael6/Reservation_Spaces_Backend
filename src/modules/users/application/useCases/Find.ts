import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/types";
import { UserRepository } from "../../infrastructure/usersRepository";

@injectable()
export default class Find {
    constructor(
        @inject(USER_TYPES.REPOSITORY) 
        private readonly userRepository: UserRepository
    ) {}

    async exec() {
        return await this.userRepository.query(`SELECT * FROM "users";`)
    }
}

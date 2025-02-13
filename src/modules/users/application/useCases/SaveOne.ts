import bcryptjs from "bcryptjs"
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/types";
import { User } from "../../domain/User.entity";
import { validateModel } from "../../../../core/infrastructure/validators/validateModel";
import { UserRepository } from "../../infrastructure/usersRepository";

@injectable()
export default class SaveOne {
    constructor(
        @inject(USER_TYPES.REPOSITORY) 
        private readonly userRepository: UserRepository
    ) {}

    async exec(body: User) {
        const user = await validateModel(body, User);
        const hashedPass = bcryptjs.hashSync(user.password, 10)
        user.password = hashedPass;
        const userCreated = await this.userRepository.save(user);
        return userCreated;
    }
}

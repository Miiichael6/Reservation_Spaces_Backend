import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/types";
import { User } from "../../domain/User.entity";
import { UserRepository } from "../../infrastructure/usersRepository";

@injectable()
export default class UpdateOne {
    constructor(
        @inject(USER_TYPES.REPOSITORY) 
        private readonly userRepository: UserRepository
    ) {}

    async exec(user: User) {
        const toUpdate = {
            id: user.id,
            name: user.name + "111",
        }
        const userUpdated = await this.userRepository.save(toUpdate);
        const findUser = await this.userRepository.findOne({ where: { id: userUpdated.id } })
        if(!findUser) throw { msg: "Error", detail: "pruebas de error" }
        return findUser;
        
    }
}

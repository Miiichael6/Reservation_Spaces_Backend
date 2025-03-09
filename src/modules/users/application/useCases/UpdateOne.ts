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
        if(!user.id) throw new Error("No se puede Actualizar usuario ya que no cuenta con 'id'")
        const model = {
            id: user.id,
            status: user.status,
        }
        const userUpdated = await this.userRepository.save(model);
        const findUser = await this.userRepository.findOne({ where: { id: userUpdated.id } })
        console.log(findUser);
        if(!findUser) throw { msg: "Error", detail: "No se Actualizó" }
        delete findUser.password;
        return findUser;
        
    }
}

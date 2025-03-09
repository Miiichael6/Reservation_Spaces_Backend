import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/types";
import { Request } from "express";
import { UserRepository } from "../../infrastructure/usersRepository";

@injectable()
export default class GetLoggedUser {
    constructor(
        @inject(USER_TYPES.REPOSITORY) 
        private readonly userRepository: UserRepository
    ) {}

    async exec(req: Request) {
        const userLogged = await this.userRepository.findOne({ where: { email: req.user?.email }})
        delete userLogged.password;
        if(userLogged.status === "INACTIVE") throw new Error("User is Inactive , contact the admin to activate your account")
        return userLogged;
    }
}

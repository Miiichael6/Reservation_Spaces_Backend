import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../infrastructure/types";
import { User } from "../../domain/User.entity";
import { loginDto } from "../../domain/dtos/login.dto";
import { validateModel } from "../../../../core/infrastructure/validators/validateModel";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs";
import { UserRepository } from "../../infrastructure/usersRepository";

@injectable()
export default class Login {
  constructor(
    @inject(USER_TYPES.REPOSITORY) 
    private readonly userRepository: UserRepository
  ) {}

  async exec(body: loginDto) {
    const { password, email } = await validateModel(body, loginDto);
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) throw { message: `User with email (${email}) not found.` };
    const match = bcryptjs.compareSync(password, user.password);
    if(!match) throw { message: "Incorrect password." };
    const userLogged: Partial<User> = { ...user };
    delete userLogged.password;
    const token = this.signJWT(userLogged)
    return { token };
  }

  signJWT (user: Partial<User>) {
    const token = jwt.sign(
      user, 
      process.env.JWT_SECRETKEY as string, 
      { expiresIn: "30d" }
    );
    return token;
  }
}

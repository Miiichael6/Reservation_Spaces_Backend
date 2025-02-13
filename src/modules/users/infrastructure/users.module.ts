import { AsyncContainerModule } from "inversify";
import SaveOne from "../application/useCases/SaveOne";
import Find from "../application/useCases/Find";
import UpdateOne from "../application/useCases/UpdateOne";
import Login from "../application/useCases/Login";
import GetLoggedUser from "../application/useCases/GetLoggedUser";
import { USER_TYPES } from "./types";
import { UserRepository, userRepository } from "./usersRepository";

export const container = new AsyncContainerModule(async (bind) => {
    bind<UserRepository>(USER_TYPES.REPOSITORY).toConstantValue(userRepository)
    bind<SaveOne>(USER_TYPES.SAVE_ONE).to(SaveOne);
    bind<Find>(USER_TYPES.FIND).to(Find);
    bind<Login>(USER_TYPES.LOGIN).to(Login);
    bind<UpdateOne>(USER_TYPES.UPDATE_ONE).to(UpdateOne);
    bind<GetLoggedUser>(USER_TYPES.GET_LOGGED_USER).to(GetLoggedUser);
});
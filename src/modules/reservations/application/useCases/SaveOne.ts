import { inject, injectable } from "inversify";
import { RESERVATION_TYPES } from "../../infrastructure/types";
import { Reservation } from "../../domain/Reservation.entity";
import { validateModel } from "../../../../core/infrastructure/validators/validateModel";
import { ReservationRepository } from "../../infrastructure/reservationRepository";
import { User } from "../../../users/domain/User.entity";
import { USER_TYPES } from "../../../users/infrastructure/types";
import { UserRepository } from "../../../users/infrastructure/usersRepository";

@injectable()
export default class SaveOne {
    constructor(
        @inject(RESERVATION_TYPES.REPOSITORY) 
        private readonly reservationRepository: ReservationRepository,
        @inject(USER_TYPES.REPOSITORY) 
        private readonly userRepository: UserRepository
    ) {}

    async exec(body: Reservation, userLogged: Partial<User>) {
        const reservation = await validateModel(body, Reservation);
        const user = await this.findLoggedUser(userLogged)
        const new_reservation = this.handleSaveReservation({reservation, user})
        return new_reservation;
    }

    async findLoggedUser(userLogged: Partial<User>) {
        const [ user ] = await this.userRepository.query(`SELECT * FROM users WHERE id = ${userLogged.id};`)
        if(!user) throw new Error("User  doesn't not exist")
        return user
    }

    async handleSaveReservation(
        {reservation, user}: { reservation: Reservation, user: User}
    ) {
        reservation.user = user;
        const reservationCreated = await this.reservationRepository.save(reservation);
        delete reservationCreated.user;
        return reservationCreated;
    }
}

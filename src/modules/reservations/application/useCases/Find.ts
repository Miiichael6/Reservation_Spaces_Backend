import { inject, injectable } from "inversify";
import { RESERVATION_TYPES } from "../../infrastructure/types";
import { ReservationRepository } from "../../infrastructure/reservationRepository";
import { User } from "../../../users/domain/User.entity";

@injectable()
export default class Find {
  constructor(
    @inject(RESERVATION_TYPES.REPOSITORY)
    private readonly reservationRepository: ReservationRepository
  ) {}

  async exec(userlogged: Partial<User>) {
    return await this.reservationRepository.query(`
            SELECT id,reserved_hours,created_at FROM "reservations" 
            WHERE user_id=${userlogged.id};
        `);
  }
}

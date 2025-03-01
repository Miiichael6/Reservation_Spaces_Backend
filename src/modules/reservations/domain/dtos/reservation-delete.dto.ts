import { IsNotEmpty, IsNumber, Min} from "class-validator";
import { Expose } from "class-transformer";

export class ReservationDelete {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    @Min(1)
    reservation_id: number = 0;
}
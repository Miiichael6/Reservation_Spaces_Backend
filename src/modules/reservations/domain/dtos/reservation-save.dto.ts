import { IsNotEmpty, IsNumber, Min, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { Reservation } from "../Reservation.entity";

export class ReservationSave {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Reservation)
    @Expose()
    reservation: Reservation = new Reservation();

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Expose()
    booking_id: number = 0;
}
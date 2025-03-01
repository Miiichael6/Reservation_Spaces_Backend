import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class ReservedHoursDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    @Min(5)
    @Max(22)
    hour_start: number = 0;
  
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    @Min(6)
    @Max(23)
    hour_end: number = 0;
  }
  
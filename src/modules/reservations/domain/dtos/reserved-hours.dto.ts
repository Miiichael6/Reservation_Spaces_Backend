import { IsNotEmpty } from "class-validator";

export class ReservedHoursDto {
    @IsNotEmpty()
    start: number; // Hora de inicio en formato HH:mm
  
    @IsNotEmpty()
    end: number; // Hora de fin en formato HH:mm
  }
  
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { IsNumber, Min, ValidateNested, IsOptional, IsNotEmpty } from "class-validator";
import { Expose, Type } from "class-transformer";
import { User } from "../../users/domain/User.entity";
import { ReservedHoursDto } from "./dtos";
import { Booking } from "../../bookings/domain/Booking.entity";

@Entity({ name: "reservations" })
export class Reservation {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Expose()
  @Min(0)
  id: number = 0;

  @Column({ type: "jsonb", nullable: false })
  @IsNotEmpty()
  @Type(() => ReservedHoursDto)
  @ValidateNested()
  @Expose()
  reserved_hour: ReservedHoursDto = new ReservedHoursDto();

  @ManyToOne(() => User, (user) => user.reservations)
  @IsOptional()
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(
    () => Booking, 
    (booking) => booking.reservation, 
    { cascade: true, onDelete: "CASCADE", }
  )
  @Type(() => Booking)
  @IsOptional()
  @JoinColumn({ name: "booking_id" })
  booking: Booking;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date = new Date();
}
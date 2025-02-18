import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn } from "typeorm";
import { IsInt, IsNumber, Min, Max, IsArray, ValidateNested, IsOptional } from "class-validator"; 
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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReservedHoursDto)
    @Expose()
    reserved_hours: ReservedHoursDto[];
    
    @ManyToOne(
        () => User, 
        (user) => user.reservations,
    )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(
        () => Booking, 
        (booking) => booking.reservation,
        { cascade: true, onDelete: "CASCADE" }
    )
    @Type(() => Booking)
    @ValidateNested({ each: true })
    @IsArray()
    @IsOptional()
    bookings?: Booking[]

    @CreateDateColumn({ type: "timestamp" }) 
    created_at: Date;
}
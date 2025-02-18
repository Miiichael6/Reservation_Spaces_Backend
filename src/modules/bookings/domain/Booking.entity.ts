import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { IsNumber, Min, IsString, IsNotEmpty, min, Length } from "class-validator"; 
import { Expose } from "class-transformer";
import { Reservation } from "../../reservations/domain/Reservation.entity";

@Entity({ name: "bookings" })
export class Booking {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @Expose()
    @Min(0)
    id: number;

    @Column({ length: 50, nullable: false, unique: true })
    @IsString()
    @Length(4, 250)
    @Expose()
    coach: string = "";

    @Column({ nullable: false, unique: true, type: "int" })
    @IsNumber()
    @Min(1)
    @Expose()
    hour_start: number = 0;

    @Column({ nullable: false, unique: true, type: "int" })
    @IsNumber()
    @Expose()
    @Min(1)
    hour_end: number = 0;

    @ManyToOne(
        () => Reservation,
        (reservation) => reservation.bookings,
    )
    @JoinColumn({ name: 'reservation_id' }) 
    reservation: Reservation;
}
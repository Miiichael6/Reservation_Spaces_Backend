import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { IsNumber, Min, IsString, IsNotEmpty, min, Length, isEnum, IsEnum } from "class-validator"; 
import { Expose } from "class-transformer";
import { Reservation } from "../../reservations/domain/Reservation.entity";
enum Status {
    "FINISHED", "ACTIVE", "INACTIVE"
}
@Entity({ name: "bookings" })
export class Booking {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @Expose()
    @Min(0)
    id: number;

    @Column("varchar",{ length: 50, nullable: false })
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

    @Column("varchar", { nullable: false })
    @IsNumber()
    @Expose()
    @IsEnum(Status)
    status: string = "INACTIVE";

    @OneToMany(
        () => Reservation,
        (reservation) => reservation.booking,
    )
    @JoinColumn({ name: 'reservation_id' }) 
    reservation: Reservation[];
}
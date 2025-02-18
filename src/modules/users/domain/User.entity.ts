import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator"; 
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { Reservation } from "../../reservations/domain/Reservation.entity";

@Entity({ name: "users"})
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Expose()
  @Min(0)
  id: number = 0;

  @Column({ length: 50, nullable: false, unique: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string = "";

  @Column({ nullable: false })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Expose()
  email: string = "";
  
  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Expose()
  password: string = "";

  @Column({ length: 10, nullable: false })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @Expose()
  name: string = "";

  @Column({ length: 20, nullable: false })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @Expose()
  lastname: string = "";

  @Column({ type: "jsonb" })
  @IsArray()
  @IsString({ each: true })
  @Expose()
  role: string[] = ["user"];

  @Type(() => Reservation)
  @Exclude()
  @OneToMany(
    () => Reservation, 
    (reservation) => reservation.user, 
    { cascade: true, onDelete: "CASCADE" }
  )
  reservations?: Reservation[]
}

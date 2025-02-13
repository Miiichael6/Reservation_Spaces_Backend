import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"; 
import { Expose, Transform } from "class-transformer";

@Entity({ name: "User"})
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

  @Column({ length: 10, nullable: false })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @Expose()
  name: string = "";

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

  @Column()
  @IsNotEmpty()
  @Expose()
  description: string = "";
}

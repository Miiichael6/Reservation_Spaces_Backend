import { Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class loginDto {
  @Column()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Expose()
  email: string = "";

  @Column()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Expose()
  password: string = "";
}
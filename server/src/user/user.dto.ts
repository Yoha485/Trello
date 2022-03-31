import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @ApiProperty({type: String, description: 'email'})
  email: string;

  @IsString()
  @ApiProperty({type: String, description: 'password'})
  password: string;
}

export class RegisterDto extends LoginDto{

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({type: String, description: 'username'})
  username: string;
}

export class UpdateUserDto{
  @IsEmail()
  @IsOptional()
  @ApiProperty({type: String, description: 'email'})
  email: string;

  @IsOptional() 
  @IsString()
  @ApiProperty({type: String, description: 'username'})
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({type: String, description: 'password'})
  password: string;
}

export interface AuthPayload{
  id: number;
}
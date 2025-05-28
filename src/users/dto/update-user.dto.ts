import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    @Length(1, 255)
    firstName: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    lastName: string;

    @IsOptional()
    @IsString()
    @Length(3, 127)
    username: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Le mot de passe doit contenir au moins une majuscule et un chiffre.',
    })
    password: string;

    @IsOptional()
    @IsString()
    @Length(3, 127)
    bio: string;
}

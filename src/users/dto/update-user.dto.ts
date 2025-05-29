import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        example: 'Alice',
        description: 'Prénom de l’utilisateur',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    firstName: string;

    @ApiProperty({
        example: 'Dupont',
        description: 'Nom de famille de l’utilisateur',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    lastName: string;

    @ApiProperty({
        example: 'alice123',
        description: 'Nom d’utilisateur unique',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(3, 127)
    username: string;

    @ApiProperty({
        example: 'alice@example.com',
        description: 'Adresse email valide',
        required: false,
    })
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password123',
        description: 'Mot de passe avec au moins une majuscule et un chiffre',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Le mot de passe doit contenir au moins une majuscule et un chiffre.',
    })
    password: string;

    @ApiProperty({
        example: 'Développeur backend passionné par NestJS.',
        description: 'Petite bio de l’utilisateur',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(3, 127)
    bio: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, IsOptional } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({
        example: 'Alice',
        description: 'Prénom de l’utilisateur',
    })
    @IsString()
    @Length(1, 255)
    firstName: string;

    @ApiProperty({
        example: 'Dupont',
        description: 'Nom de famille de l’utilisateur',
    })
    @IsString()
    @Length(1, 255)
    lastName: string;

    @ApiProperty({
        example: 'alice123',
        description: 'Nom d’utilisateur unique (utilisé pour l’identification publique)',
    })
    @IsString()
    @Length(3, 127)
    username: string;

    @ApiProperty({
        example: 'alice@example.com',
        description: 'Adresse email unique de l’utilisateur',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password123',
        description: 'Mot de passe sécurisé (min. 1 majuscule et 1 chiffre)',
    })
    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Le mot de passe doit contenir au moins une majuscule et un chiffre.',
    })
    password: string;

    @ApiProperty({
        example: 'Développeur passionné par les API REST.',
        description: 'Brève biographie de l’utilisateur',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(3, 127)
    bio: string;
}

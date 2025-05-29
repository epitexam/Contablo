import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Matches } from "class-validator";

export class SigninDto {
    @ApiProperty({
        example: 'alice@example.com',
        description: 'Adresse email utilisée pour se connecter',
        type: 'string',
        format: 'email',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password123',
        description: 'Mot de passe (min. 1 majuscule et 1 chiffre)',
        type: 'string',
        format: 'password',
    })
    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Le mot de passe doit contenir au moins une majuscule et un chiffre.',
    })
    password: string;
}

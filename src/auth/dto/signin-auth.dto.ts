import { IsEmail, IsString, Length, Matches } from "class-validator";

export class SigninDto {

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Le mot de passe doit contenir au moins une majuscule et un chiffre.',
    })
    password: string;

}
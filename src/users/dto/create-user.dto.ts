import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @Length(1, 255)
    firstName: string;

    @IsString()
    @Length(1, 255)
    lastName: string;

    @IsString()
    @Length(3, 127)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Le mot de passe doit contenir au moins une majuscule et un chiffre.',
    })
    password: string;

    @IsString()
    @Length(3, 127)
    bio: string;
}

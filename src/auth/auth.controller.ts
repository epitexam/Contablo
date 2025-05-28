import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }


    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signIn(signinDto.email, signinDto.password);
    }
}

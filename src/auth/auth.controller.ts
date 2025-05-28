import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
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
    async create(@Body() createUserDto: CreateUserDto) {
        const userByEmail = await this.usersService.findOneByEmail(createUserDto.email);

        if (userByEmail) { throw new HttpException("This email is already used.", HttpStatus.CONFLICT) }

        const userByUsername = await this.usersService.findOneByUsername(createUserDto.username);

        if (userByUsername) { throw new HttpException("This username is already used.", HttpStatus.CONFLICT) }

        return this.usersService.create(createUserDto);
    }


    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(@Body() signinDto: SigninDto) {
        const userByEmail = await this.usersService.findOneByEmail(signinDto.email);

        if (!userByEmail) { throw new HttpException("No account linked to this email.", HttpStatus.NOT_FOUND) }

        return this.authService.signIn(signinDto.email, signinDto.password);
    }
}

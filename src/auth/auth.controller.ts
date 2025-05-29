import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConflictResponse, ApiNotFoundResponse, ApiBadRequestResponse, } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User successfully registered',
        type: CreateUserDto,
    })
    @ApiConflictResponse({
        description: 'Email or username already in use',
    })
    @ApiBadRequestResponse({
        description: 'Invalid request data',
    })
    async create(@Body() createUserDto: CreateUserDto) {
        const userByEmail = await this.usersService.findOneByEmail(createUserDto.email).catch(() => null);
        if (userByEmail) {
            throw new HttpException('This email is already in use.', HttpStatus.CONFLICT);
        }

        const userByUsername = await this.usersService.findOneByUsername(createUserDto.username).catch(() => null);
        if (userByUsername) {
            throw new HttpException('This username is already in use.', HttpStatus.CONFLICT);
        }

        return this.usersService.create(createUserDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Login successful, returns JWT token',
    })
    @ApiNotFoundResponse({
        description: 'No account linked to this email',
    })
    @ApiBadRequestResponse({
        description: 'Invalid request data',
    })
    async signin(@Body() signinDto: SigninDto) {
        const userByEmail = await this.usersService.findOneByEmail(signinDto.email).catch(() => null);
        if (!userByEmail) {
            throw new HttpException('No account found with this email.', HttpStatus.NOT_FOUND);
        }
        return this.authService.signIn(signinDto.email, signinDto.password);
    }
}

import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new HttpException("No account linked to this email.", HttpStatus.NOT_FOUND)
        }
        
        if (user.password !== password) {
            throw new UnauthorizedException();
        }

        const payload = { uuid: user.uuid }

        return { access_token: await this.jwtService.signAsync(payload) }
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
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

        if (user.password !== password) {
            throw new UnauthorizedException();
        }

        const payload = { uuid: user.uuid }

        return { access_token: await this.jwtService.signAsync(payload) }
    }
}

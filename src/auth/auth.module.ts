import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET || 'foobar',
      signOptions: { expiresIn: process.env.EXPIRESIN || '480h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})

export class AuthModule { }

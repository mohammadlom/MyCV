import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/constants/jwt.constant';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user'
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '24h',
      }
    }),

  ],
  providers: [
    AuthResolver
  ]
})
export class AuthModule { }

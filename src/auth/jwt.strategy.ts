import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRepository } from "./auth.repository";
import { jwtConstants } from "src/shared/constants/jwt.constant";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: { email: string, token: string }): Promise<User> {
        const user = await this.authRepository.findOne({ email: payload.email });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}

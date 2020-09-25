import { RegisterInput } from './inputs/register.input';
import { AuthRepository } from './auth.repository';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, getConnection } from "typeorm";
import { LoginInput } from './inputs/login.input';
import { LoginType } from './types/login.type';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.entity';

@Injectable()
export class AuthService {

    constructor(
        private connection: Connection,
        @InjectRepository(AuthRepository)
        private authRepo: AuthRepository,
        private jwtService: JwtService
    ) {
        this.connection = getConnection();
    }

    async login(
        loginInput: LoginInput
    ): Promise<LoginType> {
        let user = null
        try {
            user = await this.authRepo.validateUserPassword(loginInput.username, loginInput.password);
        } catch (error) {
            if (error = 'wrong') {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }

        const payload = { username: user.username, role: user.role.title };
        const accessToken = await this.jwtService.sign(payload, { expiresIn: '7d' });
        return { token: accessToken, expiresIn: ((new Date()).getTime() / 1000) + 24 * 60 * 60 };
    }

    async register(
        registerInput: RegisterInput
    ): Promise<LoginType> {
        const query = this.connection.createQueryRunner();

        if (registerInput.secretKey == 'Farazaneh') {
            throw new BadRequestException('Wrong secret key');
        }
        await query.startTransaction();
        try {
            const user = this.authRepo.create();
            user.username = registerInput.email;
            user.email = registerInput.email;
            const salt = await bcrypt.genSalt();
            user.password = await this.authRepo.hashPassword(registerInput.password, salt);
            user.salt = salt;
            user.role = Role.findOne({ title: 'admin' });

            await query.manager.save(user);
            await query.commitTransaction();
            const payload = { username: user.username, role: (await user.role).title };
            return { token: await this.jwtService.sign(payload, { expiresIn: '1d' }), expiresIn: ((new Date()).getTime() / 1000) + 24 * 60 * 60 };
        } catch (error) {
            await query.rollbackTransaction();
            throw new InternalServerErrorException(error);
        }
    }

}
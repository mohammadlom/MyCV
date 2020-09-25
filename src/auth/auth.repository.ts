import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {

    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(username: string, password: string): Promise<User> {
        const user = await this.findOne({ username });

        if (user) {
            if (await user.validatePassword(password)) {
                return user;
            } else {
                throw new InternalServerErrorException('wrong');
            }
        } else {
            throw new InternalServerErrorException();
        }
    }

}

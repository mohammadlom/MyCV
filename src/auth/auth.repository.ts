import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {



    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}

import { RegisterInput } from './inputs/register.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginInput } from './inputs/login.input';
import { LoginType } from './types/login.type';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {

    constructor(
        private authService: AuthService
    ) { }

    @Mutation(returns => LoginType)
    async register(
        @Args('registerInput', { type: () => RegisterInput }) registerInput: RegisterInput
    ): Promise<LoginType> {
        return this.authService.register(registerInput);
    }

    @Mutation(returns => LoginType)
    async login(
        @Args('loginInput', { type: () => LoginInput }) loginInput: LoginInput
    ): Promise<LoginType> {
        return this.authService.login(loginInput);
    }

    @Query(returns => String)
    async welcome(): Promise<string> {
        return 'welcome!';
    }
}

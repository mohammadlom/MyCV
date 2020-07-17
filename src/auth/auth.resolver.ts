import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
    
    @Query(returns => String)
    async welcome(): Promise<string>
    {
    return 'welcome!';
    }
}

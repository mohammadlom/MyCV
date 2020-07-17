import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') {

    constructor(
        @InjectRolesBuilder() private rolesBuilder: RolesBuilder
    ) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        return super.canActivate(new ExecutionContextHost([req]));
    }
}

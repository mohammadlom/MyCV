import { RolesBuilder } from 'nest-access-control'

export enum AppRoles {
    GUEST = 'guest',
    USER = 'user',
    ADMIN = 'admin'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    .grant(AppRoles.GUEST)
    .readAny('post')
    .readAny('post-category')
    .readAny('comment')
    .readAny('skill')

    .grant(AppRoles.USER)
    .extend(AppRoles.GUEST)
    .createOwn('comment')

    .grant(AppRoles.ADMIN)
    .extend(AppRoles.USER)
    .createAny('post')
    .deleteAny('post')
    .updateAny('post')

    .createAny('post-category')
    .deleteAny('post-category')
    .updateAny('post-category')

    .createAny('comment')
    .deleteAny('comment')
    .updateAny('comment')

    .createAny('skill')
    .updateAny('skill')
    .deleteAny('skill')


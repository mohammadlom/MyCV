import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { AuthModule } from './auth/auth.module';
import { SkillModule } from './skill/skill.module';
import { User } from './auth/user.entity';
import { Post } from './post/post.entity';
import { PostCategory } from './post-category/post-category.entity';
import { Skill } from './skill/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mysqldb',
      password: '123456789',
      database: 'cv',
      entities: [
        User,
        Post,
        PostCategory,
        Skill
      ],
      synchronize: true,
    }),
    PostModule,
    PostCategoryModule,
    AuthModule,
    SkillModule
  ],
})
export class AppModule {}

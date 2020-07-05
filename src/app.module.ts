import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { PostModule } from './post/post.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { AuthModule } from './auth/auth.module';
import { SkillModule } from './skill/skill.module';
import { User } from './auth/user.entity';
import { Post } from './post/post.entity';
import { PostCategory } from './post-category/post-category.entity';
import { Skill } from './skill/skill.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.entity';

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
        Comment,
        PostCategory,
        Skill
      ],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    PostModule,
    PostCategoryModule,
    AuthModule,
    SkillModule,
    CommentModule
  ],
})
export class AppModule {}

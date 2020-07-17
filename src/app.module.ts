import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { PostModule } from './post/post.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { AuthModule } from './auth/auth.module';
import { SkillModule } from './skill/skill.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    PostModule,
    PostCategoryModule,
    AuthModule,
    SkillModule,
    CommentModule
  ],
})
export class AppModule { }

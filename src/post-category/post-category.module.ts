import { PostCategoryRepository } from './post-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostCategoryResolver } from './post-category.resolver';
import { PostCategoryService } from './post-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostCategoryRepository
    ])
  ],
  providers: [
    PostCategoryResolver,
    PostCategoryService
  ]
})
export class PostCategoryModule { }

import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository
    ])
  ],
  providers: [
    CommentService,
    CommentResolver
  ]
})
export class CommentModule { }

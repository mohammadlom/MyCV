import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostResolver } from './post.resolver';
import { PostRepository } from './post.repositoy';
import { PostService } from './post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostRepository
        ])
    ],
    providers: [
        PostResolver,
        PostService
    ]
})
export class PostModule { }

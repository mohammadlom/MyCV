import { User } from 'src/auth/user.entity';
import { UpdatePostInput } from './inputs/update-post.input';
import { CreatePostInput } from './inputs/create-post.input';
import { MessageType } from './../shared/types/message.type';
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Post } from "./post.entity";
import { PostService } from './post.service';
import { GetUser } from 'src/shared/current-user.decorator';

@Resolver()
export class PostResolver {

    constructor(
        private postService: PostService
    ) { }

    @Query(returns => [Post])
    async posts(): Promise<Post[]> {
        return this.postService.posts();
    }

    @Mutation(returns => MessageType)
    async createPost(
        @Args('createPostInput', { type: () => CreatePostInput }) createPostInput: CreatePostInput,
        @GetUser() user: User
    ): Promise<MessageType> {
        return this.postService.createPost(createPostInput, user);
    }

    @Mutation(returns => MessageType)
    async updatePost(
        @Args('updatePostInput', { type: () => UpdatePostInput }) updatePostInput: UpdatePostInput
    ): Promise<MessageType> {
        return this.postService.updatePost(updatePostInput);
    }

    @Mutation(returns => MessageType)
    async deletePost(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MessageType> {
        return this.postService.deletePost(id);
    }

}
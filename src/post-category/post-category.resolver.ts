import { CreatePostCategoryInput } from './inputs/create-post-category.input';
import { MessageType } from './../shared/types/message.type';
import { PostCategory } from './post-category.entity';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostCategoryService } from './post-category.service';
import { UpdatePostCategoryInput } from './inputs/update-post-category.input';

@Resolver()
export class PostCategoryResolver {

    constructor(
        private postCategoryService: PostCategoryService
    ) { }

    @Query(returns => [PostCategory])
    async postCategories(): Promise<PostCategory[]> {
        return PostCategory.find();
    }

    @Mutation(returns => MessageType)
    async createPostCategory(
        @Args('createPostCategoryInput', { type: () => CreatePostCategoryInput }) createPostCategoryInput: CreatePostCategoryInput
    ): Promise<MessageType> {
        return this.postCategoryService.createPostCategory(createPostCategoryInput);
    }

    @Mutation(returns => MessageType)
    async updatePostCategory(
        @Args('updatePostCategoryInput', { type: () => UpdatePostCategoryInput }) updatePostCategoryInput: UpdatePostCategoryInput
    ): Promise<MessageType> {
        return this.postCategoryService.updatePostCategory(updatePostCategoryInput);
    }

    @Mutation(returns => MessageType)
    async deletePostCategory(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MessageType> {
        return this.postCategoryService.deletePostCategory(id);
    }

}

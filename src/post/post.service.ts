import { User } from 'src/auth/user.entity';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostCategory } from './../post-category/post-category.entity';
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, getManager } from 'typeorm';
import { Post } from "./post.entity";
import { CreatePostInput } from './inputs/create-post.input';
import { MessageType } from './../shared/types/message.type';
import { PostRepository } from "./post.repositoy";
import { PostType } from './post-type.enum';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository,
    ) { }

    async posts(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async categories(): Promise<PostCategory[]> {
        return PostCategory.find();
    }

    async createPost(
        createPostInput: CreatePostInput,
        loggedInUser: User
    ): Promise<MessageType> {
        try {
            await getManager().transaction(async () => {
                await this.postRepository.insert({
                    title: createPostInput.title,
                    body: createPostInput.body,
                    category: Promise.resolve(PostCategory.findOne(createPostInput.categoryId)),
                    type: PostType[createPostInput.type],
                    user: Promise.resolve(loggedInUser)
                });
            });
            return new MessageType('successfully saved');
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updatePost(
        updatePostInput: UpdatePostInput
    ): Promise<MessageType> {
        const post = await this.postRepository.findOne(updatePostInput.id);
        if (!post) {
            throw new BadRequestException("No post found");
        }

        post.title = updatePostInput.title ?? post.title;
        post.body = updatePostInput.body ?? post.body;
        post.category = updatePostInput.categoryId ? Promise.resolve(await PostCategory.findOne(updatePostInput.categoryId)) : post.category;
        post.type = updatePostInput.type ?? post.type;

        try {
            await getManager().transaction(async () => {
                await post.save();
            });
            return new MessageType("successfully saved");
        } catch (error) {
            throw new InternalServerErrorException("Error in saving to db");
        }
    }

    async deletePost(
        postId: number
    ): Promise<MessageType> {
        try {
            await this.postRepository.delete({ id: postId });
            return new MessageType("successfully deleted");
        } catch (error) {
            throw new InternalServerErrorException("Error in removing entity from db");
        }
    }

}
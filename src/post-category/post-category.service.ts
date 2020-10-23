import { UpdatePostCategoryInput } from './inputs/update-post-category.input';
import { CreatePostCategoryInput } from './inputs/create-post-category.input';
import { MessageType } from './../shared/types/message.type';
import { PostCategoryRepository } from './post-category.repository';
import { PostCategory } from 'src/post-category/post-category.entity';
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager } from 'typeorm';

@Injectable()
export class PostCategoryService {

    constructor(
        @InjectRepository(PostCategory)
        private postCategoryRepository: PostCategoryRepository
    ) { }

    async createPostCategory(createPostCategoryInput: CreatePostCategoryInput): Promise<MessageType> {
        try {
            await getManager().transaction(async () => {
                await this.postCategoryRepository.insert({
                    title: createPostCategoryInput.title,
                });
            });
            return new MessageType("successfully saved");
        } catch (error) {
            throw new InternalServerErrorException("error in saving to db");
        }
    }

    async updatePostCategory(updatePostCategoryInput: UpdatePostCategoryInput): Promise<MessageType> {
        const category = await this.postCategoryRepository.findOne(updatePostCategoryInput.id);

        if (!category) {
            throw new BadRequestException("Category not found");
        }

        try {
            category.title = updatePostCategoryInput.title;
            getManager().transaction(async () => {
                await category.save();
            });
            return new MessageType("successfully updated");
        } catch (error) {
            throw new InternalServerErrorException("error in saving to db");
        }
    }

    async deletePostCategory(
        categoryId: number
    ): Promise<MessageType> {
        try {
            this.postCategoryRepository.delete({ id: categoryId });
            return new MessageType("successfully delted");
        } catch (error) {
            throw new InternalServerErrorException("error in removing entity from db");
        }
    }

}
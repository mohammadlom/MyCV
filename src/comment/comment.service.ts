import { Post } from 'src/post/post.entity';
import { UpdateCommentInput } from './inputs/update-comment.input';
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { CreateCommentInput } from './inputs/create-comment.input';
import { MessageType } from './../shared/types/message.type';
import { CommentRepository } from './comment.repository';
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { getManager } from 'typeorm';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentRepository)
        private commentRepo: CommentRepository
    ) { }

    async comments(
        postId: number
    ): Promise<Comment[]> {
        return this.commentRepo.createQueryBuilder().where('postId = ' + postId).getMany();
    }

    async createComment(
        createCommentInput: CreateCommentInput,
        loggedInUser: User
    ): Promise<MessageType> {
        try {
            await getManager().transaction(async () => {
                const comment = this.commentRepo.create();
                comment.message = createCommentInput.message;
                comment.user = Promise.resolve(loggedInUser);
                comment.post = Promise.resolve(await Post.findOne(createCommentInput.postId));
                await comment.save();
            });
            return new MessageType('successfully saved');
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateComment(
        updateCommentInput: UpdateCommentInput
    ): Promise<MessageType> {
        const comment = await this.commentRepo.findOne(updateCommentInput.id);
        if (!comment) {
            throw new BadRequestException("No comment found");
        }

        comment.message = updateCommentInput.message;

        try {
            await getManager().transaction(async () => {
                await comment.save();
            });
            return new MessageType("successfully saved");
        } catch (error) {
            throw new InternalServerErrorException("Error in saving to db");
        }
    }

    async deleteComment(
        commentId: number
    ): Promise<MessageType> {
        try {
            await this.commentRepo.delete({ id: commentId });
            return new MessageType("successfully deleted");
        } catch (error) {
            throw new InternalServerErrorException("Error in removing entity from db");
        }
    }

}
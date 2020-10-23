import { CreateCommentInput } from './inputs/create-comment.input';
import { MessageType } from './../shared/types/message.type';
import { User } from 'src/auth/user.entity';
import { GetUser } from './../shared/current-user.decorator';
import { Comment } from 'src/comment/comment.entity';
import { Query, Resolver, Args, Int, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UpdateCommentInput } from './inputs/update-comment.input';

@Resolver()
export class CommentResolver {

    constructor(
        private commentService: CommentService
    ) { }

    @Query(returns => [Comment])
    async comments(
        @Args('postId', { type: () => Int }) postId: number
    ): Promise<Comment[]> {
        return this.commentService.comments(postId);
    }

    @Mutation(returns => MessageType)
    async createComment(
        @Args('createCommentInput', { type: () => CreateCommentInput }) createCommentInput: CreateCommentInput,
        @GetUser() user: User
    ): Promise<MessageType> {
        return this.commentService.createComment(createCommentInput, user);
    }

    @Mutation(returns => MessageType)
    async updateComment(
        @Args('updateCommentInput', { type: () => UpdateCommentInput }) updateCommentInput: UpdateCommentInput
    ): Promise<MessageType> {
        return this.commentService.updateComment(updateCommentInput);
    }

    @Mutation(returns => MessageType)
    async deleteComment(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MessageType> {
        return this.commentService.deleteComment(id);
    }

}

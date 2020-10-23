import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
    @Field(type => String)
    message: string;

    @Field(type => Int)
    postId: number;
}
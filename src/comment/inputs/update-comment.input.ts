import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateCommentInput {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    message: string;
}
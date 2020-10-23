import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreatePostInput {
    @Field(type => String)
    title: string;
    @Field(type => String)
    body: string;
    @Field(type => Int)
    categoryId: number;
    @Field(type => String)
    type: string;
}
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePostCategoryInput {

    @Field(type => String)
    title: string;
}
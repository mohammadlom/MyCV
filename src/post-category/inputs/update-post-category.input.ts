import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdatePostCategoryInput {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;
}
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdatePostInput {
    @Field(type => Int)
    id: number;
    @Field(type => String, { nullable: true })
    title: string;
    @Field(type => String, { nullable: true })
    body: string;
    @Field(type => Int, { nullable: true })
    categoryId: number;
    @Field(type => String, { nullable: true })
    type: string;
}
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MessageType {
    @Field(type => String)
    message: string;
}
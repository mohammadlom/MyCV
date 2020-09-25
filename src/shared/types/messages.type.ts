import { MessageType } from './message.type';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MessagesType {
    @Field(type => [MessageType])
    messages: MessageType[];
}
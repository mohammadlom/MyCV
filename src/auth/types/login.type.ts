import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginType {
    @Field(type => String)
    token: string;
    @Field(type => Float)
    expiresIn: number;
}
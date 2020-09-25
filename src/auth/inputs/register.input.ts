import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length } from 'class-validator';

@InputType()
export class RegisterInput {
    @IsEmail()
    @Field(type => String)
    email: string;
    @Length(7)
    @Field(type => String)
    password: string;
    @Field(type => String)
    secretKey: string;
}
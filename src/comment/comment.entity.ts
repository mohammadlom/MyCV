import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "src/auth/user.entity";
import { Post } from "src/post/post.entity";
import { ObjectType, Int, Field } from "@nestjs/graphql";

@Entity({ name: 'comments' })
@ObjectType()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ type: 'text' })
    @Field(type => String)
    message: string;

    @ManyToOne(type => User, user => user.comments)
    @Field(type => User)
    user: Promise<User>;

    @Column({ default: false })
    @Field(type => Boolean)
    isActive: boolean;

    @CreateDateColumn()
    @Field(type => String)
    createdAt: Date;

    @ManyToOne(type => Post, post => post.comments)
    @Field(type => Comment)
    post: Promise<Post>;

}
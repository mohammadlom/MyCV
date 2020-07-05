import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "src/post/post.entity";
import { Comment } from "src/comment/comment.entity";
import { ObjectType, Int, Field } from "@nestjs/graphql";

@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ unique: true })
    @Field(type => String)
    username: string;

    @Column({ unique: true })
    @Field(type => String)
    email: string;

    @Column({ type: 'timestamp', nullable: true })
    @Field(type => String)
    emailVerifiedAt: Date;

    @Column()
    password: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    @Field(type => String)
    createdAt: Date;

    @Column({ default: false })
    @Field(type => Boolean)
    isBanned: boolean;
    
    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];
}
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "src/auth/user.entity";
import { PostCategory } from "src/post-category/post-category.entity";
import { PostType } from "./post-type.enum";
import { Comment } from "src/comment/comment.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@Entity({ name: 'posts' })
@ObjectType()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field(type => String)
    title: string;

    @Column({ type: 'text' })
    @Field(type => String)
    body: string;

    @ManyToOne(type => User, user => user.posts, { eager: true, cascade: true })
    @Field(type => User)
    user: User;

    @ManyToOne(type => PostCategory, postCategory => postCategory.posts, { eager: true })
    @Field(type => PostCategory)
    category: PostCategory;

    @Column({
        type: 'enum',
        enum: PostType,
        default: PostType.POST
    })
    @Field()
    type: PostType;

    @CreateDateColumn()
    @Field(type => String)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(type => String)
    updatedAt: Date;

    @DeleteDateColumn()
    @Field(type => String)
    deletedAt: Date;

    @OneToMany(type => Comment, comment => comment.post)
    @Field(type => [Comment], { nullable: true })
    comments?: Comment[];
}
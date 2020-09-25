import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Post } from "src/post/post.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@Entity({ name: 'post_categories' })
@ObjectType()
export class PostCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field(type => String)
    title: string;

    @OneToMany(type => Post, post => post.category, { cascade: true })
    @Field(type => [Post])
    posts: Post[];

    @CreateDateColumn()
    @Field(type => String)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(type => String)
    updatedAt: Date;

    @DeleteDateColumn()
    @Field(type => String)
    deletedAt: Date;
}
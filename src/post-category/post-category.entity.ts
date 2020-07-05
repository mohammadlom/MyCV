import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    @Field(type => String)
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    @Field(type => String)
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    @Field(type => String)
    deletedAt: Date;
}
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from "typeorm";
import { Post } from "src/post/post.entity";
import { Comment } from "src/comment/comment.entity";
import { ObjectType, Int, Field } from "@nestjs/graphql";
import * as bcrypt from 'bcrypt';
import { Role } from "./role.entity";

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

    @Column()
    salt: string;

    @CreateDateColumn()
    @Field(type => String)
    createdAt: Date;

    @Column({ default: false })
    @Field(type => Boolean)
    isBanned: boolean;

    @OneToMany(type => Post, post => post.user)
    posts: Promise<Post[]>;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Promise<Comment[]>;

    @ManyToOne(type => Role, role => role.users)
    role: Promise<Role>;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}
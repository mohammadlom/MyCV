import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "src/post/post.entity";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'timestamp', nullable: true })
    emailVerifiedAt: Date;

    @Column()
    password: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ default: false })
    isBanned: boolean;
    
    @OneToMany(type => Post, post => post.user)
    posts: Post[];
}
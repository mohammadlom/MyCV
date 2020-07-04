import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";
import { PostCategory } from "src/post-category/post-category.entity";
import { PostType } from "./post-type.enum";

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    body: string;
    // comments:

    @ManyToOne(type => User, user => user.posts, { eager: true, cascade: true })
    user: User;

    @ManyToOne(type => PostCategory, postCategory => postCategory.posts, { eager: true })
    category: PostCategory;

    @Column({
        type: 'enum',
        enum: PostType,
        default: PostType.POST
    })
    type: PostType;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true})
    deletedAt: Date;
}
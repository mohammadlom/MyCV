import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Int, Field } from "@nestjs/graphql";

@Entity({ name: 'skills' })
@ObjectType()
export class Skill extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field(type => String)
    title: string;

    @Column({ type: 'text' })
    @Field(type => String)
    description: string;

    @Column()
    @Field(type => Int)
    progress: number;
}
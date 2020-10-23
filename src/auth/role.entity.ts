import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { User } from './user.entity';

@Entity('roles')
@ObjectType()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    title: string;

    @OneToMany(type => User, users => users.role)
    @Field(type => [User])
    users: Promise<User[]>;
}
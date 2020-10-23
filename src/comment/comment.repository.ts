import { Comment } from 'src/comment/comment.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

}
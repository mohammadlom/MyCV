import { PostCategory } from 'src/post-category/post-category.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PostCategory)
export class PostCategoryRepository extends Repository<PostCategory> {

}

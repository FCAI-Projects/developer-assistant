import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment, CommentDocument } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<CommentDocument> {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  async findAll(): Promise<CommentDocument> {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  async findOne(@Args('id') id: string): Promise<CommentDocument> {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args('id') id: string,
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ): Promise<CommentDocument> {
    return this.commentsService.update(id, updateCommentInput);
  }

  @Mutation(() => Comment)
  async removeComment(@Args('id') id: string): Promise<CommentDocument> {
    return this.commentsService.remove(id);
  }
}

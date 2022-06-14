import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';
import { filter } from 'rxjs';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}
  async create(
    createCommentInput: CreateCommentInput,
  ): Promise<CommentDocument> {
    const comment = new this.commentModel(createCommentInput);
    return comment.save();
  }

  async findByTask(filter: UpdateCommentInput): Promise<CommentDocument[]> {
    return this.commentModel.find(filter).populate('user');
  }

  async findOne(id: String): Promise<CommentDocument> {
    return this.commentModel.findById({ _id: id });
  }

  async update(
    id: String,
    updateCommentInput: UpdateCommentInput,
  ): Promise<CommentDocument> {
    return this.commentModel.findByIdAndUpdate({ _id: id, updateCommentInput });
  }

  async remove(id: String): Promise<CommentDocument> {
    return this.commentModel.findOneAndRemove({ _id: id });
  }
}

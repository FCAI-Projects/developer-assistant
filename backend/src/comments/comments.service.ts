import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
  ) {}
  async create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const comment = new this.commentModel(createCommentInput);
    return comment.save();
  }

  async findAll(): Promise<Comment> {
    return this.commentModel.findOne();
  }

  async findOne(id: String): Promise<Comment> {
    return this.commentModel.findById({ _id: id });
  }

  async update(
    id: String,
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    return this.commentModel.findByIdAndUpdate({ _id: id, updateCommentInput });
  }

  async remove(id: String): Promise<Comment> {
    return this.commentModel.findOneAndRemove({ _id: id });
  }
}

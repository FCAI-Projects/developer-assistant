import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Model } from 'mongoose';
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel (Comment.name)
    private readonly CommentModel: Model<Comment>,
  ){}
 async create(createCommentInput: CreateCommentInput): Promise <Comment> {
   const comment = new this.CommentModel(createCommentInput);
    return comment.save();
  }

  async findAll() : Promise <Comment>{
    return this.CommentModel.findOne();
  }

  async findOne(id: String): Promise <Comment> {
    return this.CommentModel.findById({_id: id});
  }

  async update(id: String, updateCommentInput: UpdateCommentInput): Promise <Comment> {
   
    return  this.CommentModel.findByIdAndUpdate({_id: id, updateCommentInput});
  }

  async remove(id: String): Promise <Comment> {
    return this.CommentModel.findOneAndRemove({_id: id});
  }
}

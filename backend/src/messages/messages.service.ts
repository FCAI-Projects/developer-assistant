import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from './entities/message.entity';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessageDocument> {
    const createdMessage = new this.messageModel({
      ...createMessageDto,
    });
    await createdMessage.save();
    return createdMessage.populate('sender');
  }

  async findAll(group: string): Promise<MessageDocument[]> {
    return await this.messageModel.find({ group }).populate('sender').sort({
      createdAt: 1,
    });
  }
}

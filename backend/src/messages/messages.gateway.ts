import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Server, Socket } from 'socket.io';
import { Context } from '@nestjs/graphql';
import { createWriteStream, mkdirSync } from 'fs';
import * as crypto from 'crypto';
import * as fs from 'fs';

@WebSocketGateway({
  cors: '*:*',
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    client: Socket,
  ) {
    createMessageDto.message = this.decryptData(
      createMessageDto.message,
      createMessageDto.sender,
    );
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(
    @ConnectedSocket() client: Socket,
    @MessageBody('group') group: string,
  ) {
    return this.messagesService.findAll(group);
  }

  private decryptData(data: string, userId: string) {
    const privateKey = fs.readFileSync(`./keys/${userId}.pem`, 'utf8');
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(data, 'base64'),
    );

    return decryptedData.toString();
  }
}

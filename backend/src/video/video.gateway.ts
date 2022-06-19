import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Server } from 'ws';
import { GroupsService } from 'src/groups/groups.service';
import { ObjectId } from "mongoose";


@WebSocketGateway({ namespace: 'video' })
export class VideoGateway implements OnGatewayInit, OnGatewayDisconnect {

  constructor(private readonly groupsService: GroupsService) {}
  
  @WebSocketServer() server: Server;

  private activeSockets: { room: string; id: string }[] = [];

  private logger: Logger = new Logger('VideoGateway');

  @SubscribeMessage('joinRoom')
  public async joinRoom(client: Socket, data: {room: string, userId: string}): Promise<void> {

    const group = await this.groupsService.findOne(data.room);
    console.log(data.userId);
    console.log(group);
    if (!group.members.includes(data.userId as unknown as ObjectId) && group.admin.toString() !== data.userId) {
      client.emit('room-not-found', {
        room: data.room,
      });
      return;
    }

    /*
    client.join(room);
    client.emit('joinedRoom', room);
    */

    const existingSocket = this.activeSockets?.find(
      (socket) => socket.room === data.room && socket.id === client.id,
    );
      const room = data.room;
    if (!existingSocket) {
      this.activeSockets = [...this.activeSockets, { id: client.id, room }];
      client.emit(`${data.room}-update-user-list`, {
        users: this.activeSockets
          .filter((socket) => socket.room === data.room && socket.id !== client.id)
          .map((existingSocket) => existingSocket.id),
        current: client.id,
      });

      client.broadcast.emit(`${data.room}-add-user`, {
        user: client.id,
      });
    }

    return this.logger.log(`Client ${client.id} joined ${data.room}`);
  }

  @SubscribeMessage('call-user')
  public callUser(client: Socket, data: any): void {
    client.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: client.id,
    });
  }

  @SubscribeMessage('make-answer')
  public makeAnswer(client: Socket, data: any): void {
    client.to(data.to).emit('answer-made', {
      socket: client.id,
      answer: data.answer,
    });
  }

  @SubscribeMessage('reject-call')
  public rejectCall(client: Socket, data: any): void {
    client.to(data.from).emit('call-rejected', {
      socket: client.id,
    });
  }

  public afterInit(server: Server): void {
    this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    const existingSocket = this.activeSockets.find(
      (socket) => socket.id === client.id,
    );

    if (!existingSocket) return;

    this.activeSockets = this.activeSockets.filter(
      (socket) => socket.id !== client.id,
    );

    client.broadcast.emit(`${existingSocket.room}-remove-user`, {
      socketId: client.id,
    });

    this.logger.log(`Client disconnected: ${client.id}`);
  }
}

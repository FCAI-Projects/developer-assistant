import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
    async sendNotification(token: string, payload: object) {
        admin.messaging().sendToDevice(token, payload);
      }
    
}

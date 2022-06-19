import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';
import { join } from 'path';

@Module({
  controllers: [],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {
  constructor() {
    admin.initializeApp({
     credential: admin.credential.cert(join(__dirname, '/developer-assistant-ee82e-firebase-adminsdk-n1gp5-c27e161481.json')),
   });
 }
}

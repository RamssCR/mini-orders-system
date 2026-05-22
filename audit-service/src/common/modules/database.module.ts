import {
  MONGO_HOST,
  MONGO_NAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} from '#config/environment';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`,
    ),
  ],
})
export class DatabaseModule {}

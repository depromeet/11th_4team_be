import { IsBoolean, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.model';
import { IsObjectId } from 'class-validator-mongo-object-id';
import * as mongoose from 'mongoose';
import { CHAT_TYPE } from 'src/common/consts/enum';
import { Room } from './room.model';

const options: SchemaOptions = {
  collection: 'chat',
  timestamps: true,
};

@Schema(options)
export class Chat extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'room' })
  @IsObjectId()
  room: Room;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  inside: boolean;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(CHAT_TYPE)
  type: CHAT_TYPE;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  @IsObjectId()
  sender: User;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

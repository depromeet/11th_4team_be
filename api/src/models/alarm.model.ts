import { string } from 'joi';
import { IsBoolean, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.model';
import { IsObjectId } from 'class-validator-mongo-object-id';
import * as mongoose from 'mongoose';
import { CHAT_TYPE, EVENT_TYPE } from 'src/common/consts/enum';

const options: SchemaOptions = {
  collection: 'alarm',
  timestamps: true,
};

@Schema(options)
export class Chat extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  @IsObjectId()
  receiver: User;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  watch: boolean;

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

@Schema()
export class List {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  @IsObjectId()
  sender: User;

  @Prop({ required: true, type: string })
  @IsString()
  @IsEnum(EVENT_TYPE)
  eventType: EVENT_TYPE;

  @Prop({
    default: Date.now(),
    type: Date,
    ref: 'user',
  })
  createdAt: Date;

  @Prop({
    required: true,
    type: string,
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @Prop({
    required: true,
    type: string,
  })
  @IsNotEmpty()
  @IsString()
  deepLink: string;
}

export const AlarmSchema = SchemaFactory.createForClass(Chat);

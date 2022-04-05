import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CATEGORY_TYPE } from 'src/common/consts/enum';
import { User } from './user.model';
import * as mongoose from 'mongoose';

const options: SchemaOptions = {
  id: false,
  collection: 'room',
  timestamps: true,
};

@Schema()
export class GeoPoint {
  @Prop({ required: true, index: '2dsphere' })
  coordinates: number[];
}

@Schema()
export class Geometry {
  @Prop({ type: GeoPoint })
  geometry: GeoPoint;
}

@Schema(options)
export class Room extends Document {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(CATEGORY_TYPE)
  category: CATEGORY_TYPE;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  radius: number;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  })
  @IsNotEmpty()
  @IsArray()
  userList: User[];

  @Prop({ required: true, type: Geometry })
  @IsNotEmpty()
  geometry: Geometry;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

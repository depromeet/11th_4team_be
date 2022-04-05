import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getEnumToArray, STATUS_TYPE } from 'src/common/consts/enum';
import { Room } from './room.model';
import * as mongoose from 'mongoose';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  id: true,
  collection: 'user',
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: '010-2222-2222',
    description: '유저 휴대폰번호',
  })
  @Prop({
    required: true,
  })
  @IsPhoneNumber('KR')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '백엔드개발자', description: '회원 닉네임' })
  @Prop({
    default: '',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: 'www.profileUrl.com',
    description: '회원 프로필 주소',
  })
  @Prop({
    default: '',
  })
  @IsString()
  profileUrl: string;

  @ApiProperty({
    example: STATUS_TYPE.NORMAL,
    description: `${JSON.stringify(getEnumToArray(STATUS_TYPE))}`,
  })
  @Prop({
    default: STATUS_TYPE.NORMAL,
  })
  @IsEnum(STATUS_TYPE)
  status: STATUS_TYPE;

  @Prop({
    default: '',
  })
  @IsString()
  FCMToken: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'room' }] })
  favoriteRoomList: Room[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'room' })
  @IsObjectId()
  myRoom: Room;
}

export const UserSchema = SchemaFactory.createForClass(User);

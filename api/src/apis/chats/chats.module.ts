import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([])],
  providers: [],
})
export class ChatsModule {}

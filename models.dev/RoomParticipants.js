// 룸 참여자

const { Schema, model } = require('mongoose');

const RoomParticipantsSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'room' },

  //objectId 형식의 유저 리스트
  userList: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

const RoomParticipants = model('roomParticipant', RoomParticipantsSchema);

module.exports = { RoomParticipants };

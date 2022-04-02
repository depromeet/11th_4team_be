// 질문 채팅 (게시글) 관련

// 알람 관련 ( 리스트로 관리 )

const { Schema, model } = require('mongoose');

const QuestionSchema = new Schema({
  // 질문이 올라온 room 정보
  room: { type: Schema.Types.ObjectId, ref: 'room' },
  // 질문을 올린 유저정보
  chat: { type: Schema.Types.ObjectId, ref: 'chat' },

  // 질문을 올린 유저정보 필요없을수도있음!
  sender: { type: Schema.Types.ObjectId, ref: 'user' },

  commentList: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'user' },
      message: { type: String, required: true }
    }
  ]
});

const Question = model('question', QuestionSchema);

module.exports = { Question };

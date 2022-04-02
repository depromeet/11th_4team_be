//채팅 스크랩

const { Schema, model } = require('mongoose');

// 복사본 저장 해야함
const ChatScrapSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

const ChatScrap = model('chatscrap', ChatScrapSchema);
module.exports = { ChatScrap };

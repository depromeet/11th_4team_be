// 채팅
// ttl or room ref list

const { Schema, model } = require('mongoose');

const ChatSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

const Chat = model('chat', ChatSchema);
module.exports = { Chat };

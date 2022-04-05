// 채팅
// ttl  , 1000개 리스터형식

const { Schema, model } = require('mongoose');

const ChatSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    inside: { type: Boolean, required: true },
    type: { type: String, required: true },
    //위치

    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true }

    /*
        chatList  : [
            {
                type: { type: String, required: true },
                inside  : {type : Boolean ,required: true },
                sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
                message: { type: String, required: true }
            }
        ]
    */
  },
  { timestamps: true }
);

const Chat = model('chat', ChatSchema);
module.exports = { Chat };

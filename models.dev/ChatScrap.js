//채팅 스크랩

const { Schema, model } = require('mongoose');

// 복사본 저장 해야함
const chatScrap = new ChatScrap({ phoneNumber });
chatScrap._id;

const ChatScrapSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },

    room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },

    // 안에 있는지 정보
    inside: { type: Boolean, required: true },
    type: { type: String, required: true }

    // chatScrapList  : [
    //     {
    //         type: { type: String, required: true },
    //         inside  : {type : Boolean ,required: true },
    //         sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    //         message: { type: String, required: true }
    //     }
    // ]
  },
  { timestamps: true }
);

const ChatScrap = model('chatscrap', ChatScrapSchema);
module.exports = { ChatScrap };

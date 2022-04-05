// 알람 관련 ( 리스트로 관리 )

const { Schema, model } = require('mongoose');

const AlarmSchema = new Schema({
  receiver: { type: Schema.Types.ObjectId, ref: 'user' },

  // watch: { type: Boolean, default: true },
  // 정책 100 40~
  list: [
    {
      //from user

      sender: { type: Schema.Types.ObjectId, ref: 'user' },
      eventType: {
        type: String,
        required: true,
        enum: ['chat', 'question']
      },
      createdAt: { type: Date, default: Date.now },
      message: { type: String, required: true },
      deepLink: { type: String, required: true }
    }
  ]
});

const Alarm = model('alarm', AlarmSchema);

module.exports = { Alarm };

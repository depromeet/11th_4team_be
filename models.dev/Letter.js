// 편지(쪽지) 관련

const { Schema, model } = require('mongoose');

const LetterSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
    receiver: { type: Schema.Types.ObjectId, ref: 'user' },

    message: { type: String, required: true }
  },
  { timestamps: true }
);

const Letter = model('letter', LetterSchema);
module.exports = { Letter };

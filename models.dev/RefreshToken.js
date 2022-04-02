// 리프레쉬 토큰 저장용
const { Schema, model } = require('mongoose');

const RefreshTokenSchema = new Schema(
  {
    // 고유 _id 형식은 카멜 케이스 x
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    // refreshToken 저장
    refreshToken: { type: String, required: true }
  },
  { timestamps: true },

  // transform을 toJSON 으로 가능
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const RefreshToken = model('refreshToken', RefreshTokenSchema);

module.exports = { RefreshToken };

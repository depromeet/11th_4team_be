const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    // 닉네임
    nickname: { type: String, required: true },
    // 전화번호
    phoneNumber: { type: String, required: true, unique: true },

    // 프로필 정보
    profileUrl: { type: String, default: '' },

    // 유저 상태
    status: { type: String, default: 'normal', enum: ['normal', 'forbidden'] },

    // exist String , null is ""
    FCMToken: { type: String, default: '' },

    // 즐겨찾기
    favoriteRoomList: [{ type: Schema.Types.ObjectId, ref: 'room' }],

    // 한개만 들어간 방 정보
    myRoom: { type: Schema.Types.ObjectId, ref: 'room' }

  },
  { timestamps: true }
);

// UserSchema.options.toJSON = {
//   transform(doc, ret) {
//     delete ret.__v;
//     // 전화번호 필드 없애고 싶을 때
//     delete ret.phoneNumber;
//     delete ret.refreshToken;
//   }
// };

const User = model('user', UserSchema, 'user');

module.exports = { User };
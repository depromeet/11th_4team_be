// 유저 관련 모델

const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    // 닉네임
    nickname: { type: String, required: true, unique: true },
    // 전화번호
    // unique 필드는 2개이상이면 성립이 안됨
    phonenumber: { type: String, required: true },

    // 비밀번호 ( 암호화 해서 저장  salt 등)
    password: { type: String, required: true },

    // 유저 연번
    // userNumber: { type: Number, required: true },
    // 프로필 정보
    profile_url: { type: String, default: '' },

    // 유저 상태
    status: { type: String, default: 'normal', enum: ['normal', 'forbidden'] },

    // exist String , null is ""
    FCMToken: { type: String, default: '' }
  },
  { timestamps: true }
);

UserSchema.options.toJSON = {
  transform(doc, ret) {
    delete ret.password;
    delete ret.__v;
    // 전화번호 필드 없애고 싶을 때
    delete ret.phonenumber;
  }
};

const User = model('user', UserSchema);

module.exports = { User };

// 채팅방
// 위치와 1대1이라 location 합치면 좋을듯
const { Schema, model } = require('mongoose');

const RoomSchema = new Schema(
  {
    // 연번정보 없어도...
    // nubmer: { type: Number, required: true },
    //이름
    name: { type: String, required: true },
    // 카테고리
    category: {
      type: String,
      required: true,
      enum: ['01', '02', '03', '04', '05'] // 향후 매핑
    },
    // 반경정보를 category에 연관지을지 , 매번 다르게 넣을지 미정
    radius: {
      type: Number,
      required: true
    },

    userList: [{ type: Schema.Types.ObjectId, ref: 'user' }],

    geometry: {
      //lng lat Point , mul
      type: { type: String, required: true },
      coordinates: { type: [], required: true }
    }

    // 참여자 정보 ( 숫자를 ) 여기에 넣을지 모델을 분리시킬지.
  },
  { timestamps: true }
);

// 지오 쿼리 용 인텍싱
RoomSchema.index({ geometry: '2dsphere' });

const Room = model('room', RoomSchema);
module.exports = { Room };

const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
  //geojson 형식
  type: { type: String, default: "Feature" },
  properties: {
    // 연번정보
    nubmer: { type: Number, required: true },

    //이름
    name: { type: String, required: true },

    // 카테고리
    category: {
      type: String,
      required: true,
      enum: ["01", "02", "03", "04", "05"], // 향후 매핑
    },

    // 반경정보를 category에 연관지을지 , 매번 다르게 넣을지 미정
    radius: {
      type: Number,
      required: true,
    },
  },

  // 위치정보
  geometry: {
    // type Point , polygon multipolygon 등이 있음 현잰 Point 만 씀
    type: { type: String },
    coordinates: [],
  },
});
LocationSchema.index({ geometry: "2dsphere" });
const Location = model("location", LocationSchema);

LocationSchema.options.toJSON = {
  transform(doc, ret) {
    delete ret.__v;
    // delete ret.phonenumber;
  },
};
module.exports = { Location };

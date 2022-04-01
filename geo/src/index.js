const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
var cors = require("cors");
const { errorHandler, errorLoger } = require("./middleware");
const PORT = 5500;
const { customResponse } = require("./utils/customResponse");
const dotenv = require("dotenv");
dotenv.config();
// 커스텀 리스폰스
app.response = Object.create(customResponse);
const server = async () => {
  try {
    const { MONGO_URI, JWT_KEY_ACCESS } = process.env;
    if (!MONGO_URI)
      //|| !JWT_KEY_ACCESS
      throw new Error("MONGO_URI ,JWT_KEY_ACCESS is not defined env!");

    await mongoose.connect(MONGO_URI);

    app.use(cors());
    //DB 를 먼저 연결하고 나서 요청을 받아야 오류가 안남! 굿... 좋네여,..
    console.log("MongoDB conneted");
    app.disable("etag");

    app.use(express.json());
    app.use("/geo", indexRouter);

    app.use(errorLoger);
    app.use(errorHandler);
    app.listen(PORT, async () => {
      console.log("service-admin server on.");
    });
  } catch (err) {
    console.log(err);
  }
};

server();

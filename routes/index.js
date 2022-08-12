const express = require("express");
const router = express.Router();

//인덱스 라우터에서 다른 라우터로 연결시켜줌.
const postRouter = require("./sign.routes");


router.use("/sign", postRouter)
module.exports = router;

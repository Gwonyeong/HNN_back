const express = require("express");
const router = express.Router();


//엔딕스 라우터에서 다른 라우터로 연결시켜줌.
const commentRouter = require("./comments");
router.use("/comments", commentRouter);

//인덱스 라우터에서 다른 라우터로 연결시켜줌.
const signRouter = require("./sign.routes"); //이름 겹쳐서 바꿔놨어요
const postRouter = require("./post.routes");

router.use("/post", postRouter); //절단기능이다.
router.use("/sign", signRouter);

module.exports = router;

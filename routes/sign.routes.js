const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");

const SignController = require("../controllers/sign.controller");
const signController = new SignController();

// 로그인
router.post("/sign/in", signController.login);

// 회원 가입/비밀번호 확인
router.post("/up", signController.createUser);

// 이메일 중복 확인
router.post("/sign/checkEmail", signController.checkDupEmail);

// 닉네임 중복 확인
router.post("/sign/checkNickname", signController.checkDupNickname);



module.exports = router;

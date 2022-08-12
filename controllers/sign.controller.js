const SignService = require("../services/sign.service");

class SignController {
    signService = new SignService();

    //비밀번호 확인: 비밀번호와 비밀번호 확인란의 값이 같으면 true
    // 같지 않다면 false
    checkPasswordEqualConfirmPw = (password, confirmPw) => {
        if (password !== confirmPw) {
            return false;
        }
        return true;
    };
    //회원가입
    //email,nickname,password,confirmPw,MBTI
    createUser = async (req, res, next) => {
        try {
            const { email, nickname, password, confirmPw, MBTI } = req.body;

            if (!checkPasswordEqualConfirmPw(password, confirmPw)) {
                //비밀번호가 같지 않다면 false 반환
                return res.status(401).send({
                    msg: "비밀번호가 일치하지 않습니다.",
                    success: false,
                });
            }

            const signUpResult = this.signService.createUser(
                email,
                nickname,
                password,
                MBTI
            );
            return res.status(signUpResult.status).send({
                msg: signUpResult.msg,
                success: signUpResult.success,
            });
        } catch (err) {
            next(err);
        }
    };

    //중복된 이메일 확인
    checkDupEmail = async (req, res, next) => {
        try {
            const { email } = req.body;
            //중복된 이메일이 있다면 true
            //없다면 false
            if (!this.signService.checkDupEmail(email)) {
                return res.status(200).send({
                    msg: "사용할 수 있는 이메일입니다.",
                    success: true,
                });
            } else {
                return res.status(401).send({
                    msg: "이미 존재하는 이메일 입니다.",
                    success: false,
                });
            }
        } catch (err) {
            next(err);
        }
    };

    //중복된 닉네임 확인
    checkDupNickname = async (req, res, next) => {
        try {
            const { nickname } = req.body;
            //중복된 닉네임이 있다면 true
            //없다면 false
            if (!this.signService.checkDupEmail(nickname)) {
                return res.status(200).send({
                    msg: "사용할 수 있는 닉네임입니다.",
                    success: true,
                });
            } else {
                return res.status(401).send({
                    msg: "이미 존재하는 닉네임입니다.",
                    success: false,
                });
            }
        } catch (err) {
            next(err);
        }
    };

    //로그인
    login = async (req, res, next) => {};
}
module.exports = SignController;

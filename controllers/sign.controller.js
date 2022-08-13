const SignService = require("../services/sign.service");
const Joi = require("Joi");

class SignController {
    signService = new SignService();

    //비밀번호 확인: 비밀번호와 비밀번호 확인란의 값이 같으면 true
    // 같지 않다면 false
    checkPassword = async (password, confirmPw, email) => {
        if (password !== confirmPw) {
            return {
                code: 400,
                msg: "비밀번호가 일치하지 않습니다.",
                success: false,
            };
        }

        const schema = Joi.object().keys({
            password: Joi.string()
                .min(6)
                .max(19)
                .pattern(
                    new RegExp(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                    )
                )
                .required(),
        });
        try {
            // 검사시작
            await schema.validateAsync({ password: password });
        } catch (e) {
            // 유효성 검사 에러

            return {
                code: 400,
                msg: "비밀번호를 확인하세요.",
                err: e,
                success: false,
            };
        }
        if (password.search(email) > -1) {
            return {
                code: 400,
                msg: "이메일에 비밀번호가 포함됩니다.",
                success: false,
            };
        }
        return true;
    };
    //회원가입
    //email,nickname,password,confirmPw,MBTI
    createUser = async (req, res, next) => {
        try {
            const { email, nickname, password, confirmPw, MBTI } = req.body;
            const checkPasswordData = await this.checkPassword(
                password,
                confirmPw,
                email
            );

            if (checkPasswordData.success === false) {
                //비밀번호가 같지 않다면 false 반환
                return res.status(401).send({
                    msg: checkPasswordData.msg,
                    success: false,
                });
            }

            const signUpResult = await this.signService.createUser(
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

            const schema = Joi.object().keys({
                email: Joi.string().email().max(29).required(),
            });
            try {
                // 검사시작
                await schema.validateAsync({ email });
            } catch (e) {
                // 유효성 검사 에러
                return res.status(400).json({
                    code: 400,
                    message: "이메일을 확인하세요.",
                });
            }

            //중복된 이메일이 있다면 true
            //없다면 false
            if ((await this.signService.checkDupEmail(email)) === false) {
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

            const schema = Joi.object().keys({
                nickname: Joi.string()
                    .min(2)
                    .max(19)
                    .pattern(new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/))
                    .required(),
            });
            try {
                // 검사시작
                await schema.validateAsync({ nickname });
            } catch (e) {
                // 유효성 검사 에러
                return res
                    .status(400)
                    .json({ message: "닉네임을 확인하세요." });
            }
            //중복된 닉네임이 있다면 true
            //없다면 false
            if ((await this.signService.checkDupNickname(nickname)) === false) {
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
    //로그인이 성공한다면 acess, refresh 두개 발급.
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const loginData = await this.signService.login(email, password);
            if (loginData.success) {
                res.cookie("acessToken", loginData.token, {
                    maxAge: 1000 * 60 * 60,
                });
                res.cookie("refreshToken", "refresh", {
                    maxAge: 1000 * 60 * 60 * 24 * 7, //1주일 유지
                });
                return res.status(loginData.status).send({
                    success: loginData.success,
                });
            } else
                return res.status(loginData.status).send({
                    success: loginData.success,
                    msg: loginData.msg,
                });
        } catch (err) {
            next(err);
        }
    };

    //로그아웃
    logout = async (req, res, next) => {
        await res.clearCookie("acessToken");
        res.status(200).send({ success: true });
    };
}
module.exports = SignController;

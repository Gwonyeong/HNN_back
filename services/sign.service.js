const SignRepository = require("../repositories/sign.repository");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;

class SignService {
    signRepository = new SignRepository();
    //로그인
    //1. 정확한 이메일, 비밀번호를 입력시
    login = async (email, password) => {
        const userData = await this.signRepository.findEmailToPassword(email);
        //email, password를 정상적으로 입력한 경우

        if (!userData) {
            return {
                msg: "회원 정보가 일치하지 않습니다.",
                success: false,
                status: 400,
            };
        }
        if (password === jwt.verify(userData.password, env.secretKey)) {
            const token = jwt.sign(
                {
                    userId: userData.userId,
                    nickname: userData.nickname,
                    MBTI: userData.MBTI,
                    profilePicture: userData.profilePicture,
                },
                env.secretKey
            );
            return {
                token,
                success: true,
                status: 200,
            };
        }else return {
            msg: "회원 정보가 일치하지 않습니다.",
            success: false,
            status: 400,
        };
    };

    //회원가입 : 아이디 중복버튼을 누른 상태여야 하고 비밀번호가
    //비밀번호 확인과 같아야 회원가입 완료.
    createUser = async (email, nickname, password, MBTI) => {
        password = await jwt.sign(password, env.secretKey);
        const createUserData = await this.signRepository.createUser(
            email,
            nickname,
            password,
            MBTI
        );
        if (createUserData.length !== 0) {
            return {
                status: 200,
                msg: "회원가입을 축하드립니다!",
                success: true,
            };
        }
    };

    //이메일 확인 : 이메일로 데이터베이스를 찾아 중복된 이메일이 있으면
    // true , 없으면 false
    checkDupEmail = async (email) => {
        const checkDupEmailData = await this.signRepository.checkDupEmail(
            email
        );

        if (checkDupEmailData) {
            return true;
        } else return false;
    };

    checkDupNickname = async (nickname) => {
        const checkDupNicknameData = await this.signRepository.checkDupNickname(
            nickname
        );
        if (checkDupNicknameData) {
            return true;
        } else return false;
    };
}
module.exports = SignService;

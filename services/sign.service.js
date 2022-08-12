const UserRepository = require("../repositories/sign.repository");
const jwt = require("jsonwebtoken");

class SignService {
    userRepository = new UserRepository();
    //회원가입 : 아이디 중복버튼을 누른 상태여야 하고 비밀번호가
    //비밀번호 확인과 같아야 회원가입 완료.
    createUser = async (email, nickname, password, MBTI) => {
        const createUserData =await this.userRepository.createUser(email, nickname, password, MBTI);
        if(createUserData){
            return {
                status: 200,
                msg: "회원가입을 축하드립니다!",
                success: true,
            };

        }
    };
    
    //이메일 확인 : 이메일로 데이터베이스를 찾아 중복된 이메일이 있으면
    // true , 없으면 false
    checkDupEmail = async(email) => {
        const checkDupEmailData = this.userRepository.checkDupEmail(email)
        if(checkDupEmailData){
            return true
        }return false
    } 

    checkDupNickname = async(nickname) => {
        const checkDupNicknameData = this.userRepository.checkDupNickname(nickname)
        if(checkDupNicknameData){
            return true
        }return false
    } 
}
module.exports = SignService;

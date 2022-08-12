const { User } = require("../models");

class UserRepository {
    createUser = async (id, pw, nickname, MBTI) => {
        const createUserData =await User.create({ id, pw, nickname, MBTI });
        return createUserData;
    };

    checkDupEmail = async (email) => {
        const dupEmailData = await User.findOne({
            where: { email },
        });
        return dupEmailData;
    };
    checkDupNickname = async (nickname) => {
        const dupNicknameData = await User.findOne({
            where: { nickname },
        });
        return dupNicknameData
    }
    signInUser = async (id, pw) => {
        const loginUserData = await User.findOne({ where: { id, pw } });
        
        return loginUserData;
    };

}

module.exports = UserRepository;

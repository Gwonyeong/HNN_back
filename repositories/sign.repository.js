const { User } = require("../models");

class UserRepository {
    createUser = async (email, nickname, password, MBTI) => {
        const createUserData = await User.create({
            email,
            password,
            nickname,
            MBTI,
        });
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
        return dupNicknameData;
    };
    findEmailToPassword = async (email) => {
        const jwtPassword = await User.findOne({
            where: { email },
        });
        return jwtPassword;
    };
}

module.exports = UserRepository;

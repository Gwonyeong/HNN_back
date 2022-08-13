const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.acessToken; //토큰 정상 출력

        if (!token) {
            res.status(400).send({
                errorMessage: "로그인 후 사용하세요",
            });
            return;
        }

        const tokenvoll = jwt.verify(token, env.secretKey);
        res.locals.userId = tokenvoll.userId;
        res.locals.nickname = tokenvoll.nickname;
        res.locals.MBTI = tokenvoll.MBTI;
        res.locals.profilePicture = tokenvoll.profilePicture;
        next();
    } catch (err) {
        next(err);
        return;
    }
};

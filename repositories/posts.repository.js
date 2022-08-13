const { Like, Post } = require("../models");

class PostRepository {
    findAllPost = async () => {
        const posts = await Post.findAll();
        // const like = [];

        // for (let i = 0; i < posts.length; i++) {
        //     const temp = await Like.findAll({
        //         where: { postId: posts[i].postId },
        //     });
        //     like.push(temp.length);
        // }
        // return { posts, like };
        return posts;
    };

    findOnePost = async (postId) => {
        const detailPost = await Post.findOne({
            where: { postId },
        });
        return detailPost;
    };

    createPost = async (
        nickname,
        pw,
        title,
        content,
        userId,
        songTitle,
        singer
    ) => {
        // createPost = async (title, content, imageUrl) => {
        // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
        const createPostData = await Post.create({
            title,
            content,
            imageUrl,
            like: 0,
            userId,
            songTitle,
            singer,
        });
        console.log("repo", createPostData);

        return createPostData;
    };

    updatePost = async (postId, title, content, imageUrl) => {
        const updatePostData = await Post.update(
            { title, content, imageUrl },
            {
                where: { postId },
            }
        );

        return updatePostData;
    };

    //포스트 아이디로 포스트를 뒤져 비밀번호가 같으면 true
    //아니면 false
    // checkPw = async (postId, pw) => {
    //     const checkPostPwData = await Post.findOne({
    //         where: { postId },
    //     });
    //     if (pw === checkPostPwData.pw) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    deletePost = async (postId) => {
        await Post.destroy({
            where: { postId },
        });
    };
}

module.exports = PostRepository;

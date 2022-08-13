const PostRepository = require("../repository/posts.repository");

class PostService {
    postRepository = new PostRepository();

    getPostAll = async () => {
        const allpost = await this.postRepository.findAllPost();

        let posts = [];
        for (i in allpost) {
            const post = allpost[i].dataValues;
            const likes = await this.postRepository.findLikesNum(post.postId);
            const postInfo = {
                title: post.title,
                content: post.content,
                nickname: post.nickname,
                profilePicture: post.profilePicture,
                MBTI: post.MBTI,
                createdAt: post.createdAt,
                likes,
            };
            posts.push(postInfo);
        }
        return posts;
    };
}

module.exports = PostService;

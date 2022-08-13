const PostRepository = require("../repositories/posts.repository");
const { all } = require("../routes/post.routes");

class PostService {
    postRepository = new PostRepository();

    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();

        // console.log(allPost.Locals[2].dataValues);

        const Posts = allPost.posts.map((post, i) => {
            const Locals = allPost.Locals;

            for (let i = 2; i < Locals.length; i++) {
                return {
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt,
                    // like: allPost.like[index],
                    songTitle: post.songTitle,
                    singer: post.singer,

                    nickname: allPost.Locals[i].dataValues.nickname,
                    MBTI: allPost.Locals[i].dataValues.MBTI,
                    profilePicture: allPost.Locals[i].dataValues.profilePicture,
                };
            }
        });

        Posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return {
            Posts,
        };
    };

    getPost = async (postId) => {
        const getPostData = await this.postRepository.findOnePost(postId);

        const Poster = {
            nickname: getPostData.nickname,
            title: getPostData.title,
            content: getPostData.content,
            info: {
                songTitle: getPostData.songTitle,
                singer: getPostData.singer,
            },
            MTBI: getPostData.MBTI,
            profilePicture: getPostData.profilePicture,
            createdAt: getPostData.createdAt,
            // like: getPostData.like,
        };

        const commenter = {
            nickname,
            content,
            profilePicture,
            MBTI,
            createdAt,
        };

        return {
            Post,
            status: 200,
        };
    };

    createPost = async (
        title,
        content,
        imageUrl,
        songTitle,
        singer,
        userId,
        MBTI
    ) => {
        await this.postRepository.createPost(
            title,
            content,
            imageUrl,
            songTitle,
            singer,
            userId,
            MBTI
        );

        return {
            status: 200,
            msg: "게시물이 생성되었습니다!",
        };
    };

    updatePost = async (postId, title, content, imageUrl) => {
        await this.postRepository.updatePost(postId, title, content, imageUrl);
        return {
            status: 200,
            msg: "게시물이 수정되었습니다.",
        };
    };

    deletePost = async (postId) => {
        await this.postRepository.deletePost(postId);
        return { status: 200, msg: "게시물 삭제에 성공했습니다." };
    };
}

module.exports = PostService;

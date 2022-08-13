

class PostService {
    postRepository = new PostRepository();


    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();

        const Posts = allPost.posts.map((post, idx) => {
            return {
                postId: post.postId,
                // nickname: post.nickname,
                title: post.title,
                content: post.content,
                // profilePicture: post.profilePicture,
                // MBTI: post.MBTI,
                createdAt: post.createdAt,
                // like: allPost.like[idx],
                // comment: post.comment,
            };
        });

        Posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return {
            Posts,
            status: 200,
        };
    };

    getPost = async (postId) => {
        const getPostData = await this.postRepository.findOnePost(postId);

        const Post = {
            nickname: getPostData.nickname,
            title: getPostData.title,
            content: getPostData.content,
            createdAt: getPostData.createdAt,
            // like: getPostData.like,
        };
        return {
            Post,
            status: 200,
        };
    };

    // createPost = async (nickname, pw, title, content, userId) => {
    createPost = async (title, content, imageUrl) => {
        await this.postRepository.createPost(
            title,
            content,
            imageUrl
            // userId
        );

        return {
            status: 200,
            msg: "게시물이 생성되었습니다!",
        };
        console.log("service", createPost);
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

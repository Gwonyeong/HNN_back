const PostService = require("../service/posts.service");

class PostsController {
    postService = new PostService();
    getPostAll = async (req, res, next) => {
        const posts = await this.postService.getPostAll();
        return res.status(200).json({ data: posts });
    };
}

module.exports = PostsController;

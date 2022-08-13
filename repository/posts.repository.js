const { Post } = require("../models");

class PostRepository {
    getPostAll = async () => {
        const posts = await Post.findAll();
        return posts;
    };
}

module.exports = PostRepository;

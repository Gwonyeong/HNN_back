const { Comment } = require("../models");

class CommentRepository {
    createComment = async (userId, nickname, postId, content) => {
        const createdComment = await Comment.create({
            userId,
            nickname,
            postId,
            content,
        });
        return createdComment;
    };
    updateComment = async (postId, content) => {
        const updateComment = await Comment.update(
            { content },
            { where: { postId } }
        );
        return updateComment;
    };
    deleteComment = async (postId) => {
        const deleteComment = await Comment.destory({ where: { postId } });
        return deleteComment;
    };
}

module.exports = CommentRepository;

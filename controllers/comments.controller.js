const CommentService = require("../services/comments.service");

class CommnetsController {
    commentService = new CommentService();
    createComment = async (req, res, next) => {
        const { userId, nickname } = res.locals.user;
        const { postId } = req.params;
        const { content } = req.body;

        const createdComment = await this.commentService.createComment(
            userId,
            nickname,
            postId,
            content
        );
        return res.status(200).json({ data: createdComment });
    };
    updateComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId } = req.params;
        const { content } = req.body;

        const updateComment = await this.commentService.updateComment(
            userId,
            postId,
            content
        );
        return res.status(200).json({ data: updateComment });
    };
    deleteComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId } = req.params;

        const deleteComment = await this.commentService.deleteComment(
            userId,
            postId
        );
        return res.status(200).json({ data: deleteComment });
    };
}

module.exports = CommnetsController;

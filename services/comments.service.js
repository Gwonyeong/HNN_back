const CommentRepository = require("../repositories/comments.repository");

class CommentService {
    commentRepository = new CommentRepository();

    createComment = async (userId, nickname, postId, content) => {
        const createdComment = await this.commentRepository.createComment(
            userId,
            nickname,
            postId,
            content
        );
        return { createdComment };
    };
    updateComment = async (userId, postId, content) => {
        const updateComment = await this.commentRepository.findById(postId);
        if (!updateComment) {
            return "댓글을 업데이트할 게시물이 없을때 에러메세지";
        }
        if (userId !== updateComment.userId) {
            return "자신이 쓴글이 아닐때 에러메세지";
        }
        const commentUpdate = await this.commentRepository.updateComment(
            userId,
            postId,
            content
        );
        return { commentUpdate };
    };
    deleteComment = async (userId, postId) => {
        const deleteComment = await this.commentRepository.findById(postId);
        if (!deleteComment) {
            return "댓글을 지울 게시물이 없을때 에러메세지";
        }
        if (userId !== deleteComment.userId) {
            return "자신이 쓴글이 아닐때 에러메세지";
        }
        const commentDelete = await this.commentRepository.deleteComment(
            userId,
            postId
        );
        return { commentDelete };
    };  
}

module.exports = CommentService;

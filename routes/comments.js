const express = require('express');
const router = express.Router();

const CommentsController = require('../controller/comments.controller');
const commentsController = new CommentsController();

router.post("/comment/:postId", commentsController.createComment);

module.exports = router;
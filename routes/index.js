const express = require("express");
const router = express.Router();

const commentRouter = require("../routes/comments");
router.use("/comments", [commentRouter]);

module.exports = router;

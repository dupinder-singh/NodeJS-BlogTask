const express = require('express');
const router = express.Router();
const commentHandler = require('../handlers/commentHandler');
const { authentication } = require('../authMiddleware');

router.post('/:blogId', authentication, commentHandler.addComment);

router.post('/reply/:blogId/:commentId', authentication, commentHandler.addReply);

module.exports = router;
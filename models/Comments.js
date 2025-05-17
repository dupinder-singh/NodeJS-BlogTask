const mongoose = require('mongoose');
const replySchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    text: String,
    replies: [replySchema],
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', commentSchema);
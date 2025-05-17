const Comment = require('../models/Comments');

exports.addComment = async (req, res) => {
     const { blogId } = req.params;
      const { text } = req.body;
      const comment = new Comment({ blogId, text, replies: [] });
      await comment.save();
      res.redirect('/blogs/view/' + blogId);
}

exports.addReply = async (req, res) => {
     const { blogId, commentId } = req.params;
      const { text } = req.body;
      await Comment.findByIdAndUpdate(commentId, {
        $push: { replies: { text } }
      });
      res.redirect('/blogs/view/' + blogId);
}
const Blog = require('../models/Blog');
const Comment = require('../models/Comments')
exports.getAddBlog = (req, res) => {
    res.render('blogForm', { blog: null });
  };

  exports.postAddBlog = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? '/images/upload/' + req.file.filename : '';
    const blog = new Blog({ title, description, image, user: req.user._id });
    await blog.save();
    res.redirect('/blogs/list');
  };

  exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find({ user: req.user._id });
    
    res.render('blogList', {blogs, other: false});
  };

  exports.getOtherBlogs = async (req, res) => {
    const userId = req.user._id;
    const blogs = await Blog.find({ user: { $ne: userId } });
    res.render('blogList', {blogs, other: true})
  }
  
  exports.getEditBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blogForm', { blog });
  };
  
  exports.postEditBlog = async (req, res) => {
    const { title, description } = req.body;
    if (req.file) updateData.image = '/images/upload/' + req.file.filename;
    await Blog.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect('/blogs/list');
  };
  
  exports.deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs/list');
  };
  
  exports.viewBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const comments = await Comment.find({ blogId: req.params.id });
    blog.comments = comments;
    res.render('blogView', { blog });
  };
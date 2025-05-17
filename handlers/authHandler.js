const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Blog = require('../models/Blog');

const bcrypt = require('bcryptjs');


exports.getSignup = (req, res) => {
    res.render('signup');
  };

exports.postSignup = async (req, res) => {
    const {email,password} = req.body;
    const profile = req.file ? '/images/upload/' + req.file.filename : '';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password: hashedPassword,
        profile
    });
    await user.save();
    res.redirect('/login');
}

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.postLogin = async (req, res) => {
    const {email, password} = req.body;
    const existedUser = await User.findOne({email});
    if (!existedUser) return res.redirect('/login');

    const isPasswordMatched = await bcrypt.compare(password, existedUser.password)

    if(!isPasswordMatched) return res.redirect('/login');

    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET);
    res.cookie('jwt', token);
    res.redirect('/dashboard');
}

exports.getDashboard = (req,res) => {
    // const blogs = Blog.findOne({user: })
    res.render('dashboard', {user: req.user});
}
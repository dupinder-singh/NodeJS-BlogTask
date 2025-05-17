const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
dotenv.config();

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.set('view engine', 'ejs');

app.use(cookieParser());


const auth = require('./routes/auth');
const blog = require('./routes/blog');
const comments = require('./routes/comment');
// route
app.use('/', auth);
app.use('/blogs', blog);
app.use('/comments', comments);
//mongodb
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', () => {
    console.log('MongoDB is connected')
});


app.use(async(req, res) => {
    const token = req.cookies.jwt;
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const existedUser = await User.findById(decoded.id);
        if (!existedUser) {
          return res.redirect('/login');
        }
        return res.redirect('/dashboard');
      } catch (err) {
        console.error('JWT verification error:', err);
        return res.redirect('/login');
      }
    } else {
      return res.redirect('/login');
    }
  });
  
app.listen(process.env.PORT,()=>{
    console.log('Server is running on'+ process.env.PORT)
})
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
const upload = multer({ dest: 'images/upload/',limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });

const blogHandler = require('../handlers/blogHandler');
const { authentication } = require('../authMiddleware');

router.get('/add', authentication, blogHandler.getAddBlog);
router.post('/add', authentication, upload.single('image'), blogHandler.postAddBlog);

router.get('/list', authentication, blogHandler.getBlogs);
router.get('/other', authentication, blogHandler.getOtherBlogs);

router.get('/edit/:id', authentication, blogHandler.getEditBlog);
router.post('/edit/:id', authentication, upload.single('image'), blogHandler.postEditBlog);

router.get('/delete/:id', authentication, blogHandler.deleteBlog);

router.get('/view/:id', authentication, blogHandler.viewBlog);

module.exports = router;
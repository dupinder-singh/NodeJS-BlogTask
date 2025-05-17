const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'images/upload/' });
const authHandler = require('../handlers/authHandler');
const { authentication } = require('../authMiddleware');


router.get('/', (req, res) => {
    res.redirect('/login');
  });

router.get('/signup', authHandler.getSignup);
router.post('/signup', upload.single('profile'), authHandler.postSignup);

router.get('/login', authHandler.getLogin);
router.post('/login', authHandler.postLogin);

router.get('/dashboard', authentication, authHandler.getDashboard);

module.exports = router;
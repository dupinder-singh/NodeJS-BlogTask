const jwt = require('jsonwebtoken')
const User = require('./models/User');

exports.authentication = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
            const existedUser = await User.findById(decodedJwt.id);

            if (!existedUser) throw new Error('No user found');

            req.user = existedUser;
            next();
        } catch (e) {
           return res.redirect('/login')
        }
    }else {
        res.redirect('/login')
    }
}
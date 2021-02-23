const { SECRET, COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.cookies[COOKIE_NAME];

    if (token) {
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                res.clearCookie(COOKIE_NAME);
            } else {
                req.user = decoded;
                // console.log('logged from auth.js');
                // console.log(req.user);
                res.locals.user = decoded;
                res.locals.isAuth = true;
                // console.log(res.locals);
            }
        });
    }

    next();
}

module.exports = auth;
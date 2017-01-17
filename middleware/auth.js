const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createJWT = exports.createJWT = (id, secret) => {
    return jwt.sign({
        id: id
    }, secret, {
        expiresIn: config.JWT_TTL
    });
};

const verifyJWT = exports.verifyJWT = (token, secret, cb) => jwt.verify(token, secret, cb);

exports.login = (req, res, next) => {

    console.log('login midware', req.body.username);
    User.find({
        username: req.body.username
    }, (err, users) => {
        // console.log('mongo user', users);
        if (err) {
            res.status(500);
            return res.json({
                error: config.MESSAGES.DB_ERROR
            });
        }
        if(users.length > 1) {
            throw new Error("Usernames must be unique");
        }
        if(users.length !== 1) {
            res.status(403);
            return res.json({
                error: config.MESSAGES.FORBIDDEN
            });
        }
        let user = users[0];
        let newToken = createJWT(user._id, config.APP_KEY);
        console.log('created token', newToken);

        let fields = ['username', 'firstName', 'lastName', 'password', 'email', 'loginAttempts'];
        res.locals.loggedInUser = {};
        fields.forEach(f => res.locals.loggedInUser[f] = user[f]);
        res.locals.loggedInUser.token = newToken;
        next();
    });
};

// accessControlLayer
exports.ACL = (req, res, next) => {

    if (req.user.hasRole('admin')) {
        next();
    }
    res.status(403);
    res.json({
        error: config.MESSAGES.FORBIDDEN
    });
    next();
}

exports.authenticate = (req, res, next) => {
    let token = req.headers['x-access-token'];
    console.log('get token from header', token);
    if (!token) {
        res.status(403);
        return res.json({
            error: config.MESSAGES.FORBIDDEN
        });
    }

    verifyJWT(token, config.APP_KEY, (err, decoded) => {
        if (err) {
            res.status(403);
            return res.json({
                error: config.MESSAGES.FORBIDDEN
            });
        }
        console.log('decoded token', decoded);
        // now get the user from mongo
        User.findOne({ _id: decoded.id }, (err, user) => {
            if(err) {
                throw Error(err);
            }

            req.user = user;
            console.log('found user', user);

            next();
        });
        // and add the user to req.user
    });

};

const sign = (req, res, next) => {

};



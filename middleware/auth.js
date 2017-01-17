let config = require('../config');
let jwt = require('jsonwebtoken');

exports.ACL = (req, res, next) => {

    if (req.user.hasRole('admin')) {
        next();
    }
    res.status(403);
    res.json({
        error: config.MESSAGES.FORBIDDEN
    })
}

exports.authenticate = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        res.status(403);
        return res.json({
            error: config.MESSAGES.FORBIDDEN
        });
    }

    verifyJWT(token, secret, (err, res) => {
        if (err) {
            res.status(403);
            return res.json({
                error: config.MESSAGES.FORBIDDEN
            });
        }

        console.log(res);
    });
};

const sign = (req, res, next) => {
    
};

exports.createJWT = (id, secret) => {
    return jwt.sign({
        id: id
    }, secret, {
        expiresIn: config.JWT_TTL
    });
};

exports.verifyJWT = (token, secret, cb) => jwt.verify(token, secret, cb);
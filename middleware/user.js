const User = require('../models/user');
const config = require('../config');

exports.saveUser = (req, res, next) => {
    let user = new User(req.body);
    user.save((err, newUser) => {
        if (err) {
            res.status(422); // Unprocessible entity
            return res.json({
                error: config.MESSAGES.UNPROCESSED
            });
        }
        res.locals.newUser = newUser;
        next();
    });
};

exports.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(404);
            return res.json({
                error: config.MESSAGES.NOT_FOUND
            })
        }
        res.locals.allUsers = users;
        next();
    });
};

exports.getUserById = (req, res, next) => {
    User.find({
        _id: req.params.userid
    }, (err, users) => {
        if (err) {
            res.status(404);
            return res.json({
                error: config.MESSAGES.NOT_FOUND
            })
        }
        res.locals.userById = users;
        next();
    });
};
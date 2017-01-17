const express = require('express');
let router = express.Router();
const ACL = require('../middleware/auth').ACL;
const userMiddleware = require('../middleware/user');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.authenticate, (req, res) => {
    res.json({msg: 'you have reached the users section'});
});

router.get('/me', authMiddleware.authenticate, (req, res) => {
    res.json(req.user);
});

router.get('/:userid', authMiddleware.authenticate, userMiddleware.getUserById, (req, res) => {
    res.status(200); // create new entity
    res.json(res.locals.userById);
});

router.post('/', userMiddleware.saveUser, (req, res) => {
    console.log('rbody', req.body);
    res.status(201); // create new entity
    res.json(res.locals.newUser);
});

module.exports = router;
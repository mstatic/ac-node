const express = require('express');
let router = express.Router();
const ACL = require('../middleware/auth').ACL;
const userMiddleware = require('../middleware/user');
router.get('/', (req, res) => {
    res.send('you have reached the users section');
});

router.get('/me', ACL, (req, res) => {
    res.send('you have requested the me route');
});

router.get('/:userid', userMiddleware.getUserById, (req, res) => {
    res.status(200); // create new entity
    res.json(res.locals.userById);
});

router.post('/', userMiddleware.saveUser, (req, res) => {
    console.log('rbody', req.body);
    res.status(201); // create new entity
    res.json(res.locals.newUser);
});

module.exports = router;
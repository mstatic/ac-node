const express = require('express');
const authMiddleware = require('../middleware/auth');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('you have reached the auth endpoint');
});

router.post('/login', authMiddleware.login, (req, res) => {
    res.status(200); // default should be 200. This line might not be needed
    return res.json(res.locals.loggedInUser);
});

module.exports = router;
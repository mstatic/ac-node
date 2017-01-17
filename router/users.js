const express = require('express');
const config = require('../config');

let router = express.Router();
const ACL = require('../middleware/auth').ACL;

router.get('/', (req, res) => {
    res.send('you have reached the users section');
});

router.get('/me', ACL,
    (req, res) => {
        res.send('you have requested the me route');
    });

module.exports = router;
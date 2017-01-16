const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.send('you have reached the users section');
});

function midWare(req, res, next) {
    console.log('middleware function fired');
    next();
}

router.get('/me', midWare,
    (req, res) => {
        res.send('you have requested the me route');
    });

module.exports = router;
const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    
    res.send('you have reached the events endpoint');
});

module.exports = router;
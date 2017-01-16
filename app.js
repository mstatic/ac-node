const express = require('express');
const app = express();
const colors = require('colors');
const http = require('http');
const server = http.createServer(app);

let userRouter = require('./router/users');
let eventRouter = require('./router/events');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/welcome.html');
});

app.use('/users', userRouter);
app.use('/events', eventRouter);

server.listen(9000, () => {
    console.log('Listenning on port 9000...'.green);
});
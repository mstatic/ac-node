const express = require('express');
const app = express();
const colors = require('colors');
const http = require('http');
const server = http.createServer(app);
const config = require('./config');
const bodyParser = require('body-parser');
const mongo = require('./database/mongo');
let userRouter = require('./router/users');
let eventRouter = require('./router/events');
let authRouter = require('./router/auth');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/welcome.html');
});

//MIDDLEWARE
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/auth', authRouter);

const start = () => {
    let connection = mongo.init();

    connection.then((res) => {
        server.listen(9000, () => {
            console.log('Listenning on port 9000...'.green);
        });
    });
}

start();

module.exports = app;
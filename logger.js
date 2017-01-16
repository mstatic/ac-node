const EventEmitter = require('events').EventEmitter;

let logger = new EventEmitter();


logger.on('debug', (arg) => {
    console.log(arg);
});

logger.on('error', (arg) => {
    console.error(arg);
});

// console.log(events);
// console.log(eventsEmitter);

module.exports = logger;

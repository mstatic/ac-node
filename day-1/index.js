const logger = require('./logger.js');

logger.emit('debug', 'this is debug');
logger.emit('error', 'this is error event');
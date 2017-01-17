let env = process.env.NODE_ENV || 'development';
const common = require('./common');
let config;


switch (env) {
    case 'development':
    case 'dev':
    case 'local':
        console.log(env);

        config = require('./development');
        break;
    case 'staging':
        config = require('./staging');
        break;
    case 'prod':
        config = require('./prod.js');
        break;
    default:
        throw new Error("Specify a valid NODE_ENV");
}

module.exports = Object.assign(common, config);
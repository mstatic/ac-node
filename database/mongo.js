const mongoose = require('mongoose');
const connectionString = 'mongodb://127.0.0.1:27017/wheretodance';

mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

exports.init = () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.once('connected', (err, res) => {
            console.log('connected to mongoose');
            if(err) reject(err)
            else resolve(res)
        });
    });
}

const wipe = () => {

}

const seed = () => {
    
}
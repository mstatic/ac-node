const mongo = require('../../database/mongo.js');
const User = require('../../models/user.js');
const faker = require('faker');
const expect = require('chai').expect;

describe('User model', function () {


    it('should create a user', function () {
        let userData = {
            username: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.lorem.words(1),
            loginAttempts: 0
        };

        // console.log(userData);

        let user = new User(userData);
        user.save((err, res) => {
            expect(res.username).to.equal(userData.username);
        });

    });

    it('should get all users', function () {
        let users = User.find((err, res) => {
            // console.log(res);

            if (err) throw err;
            expect(res.length).to.be.above(0);
        });
    });
});
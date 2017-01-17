const routes = require('../../router/users');
const app = require('../../app');
const supertest = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');
const User = require('../../models/user');

let userData = {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.words(1),
    loginAttempts: 0
};

describe('Auth Routes', function () {

    before(function (done) {
        let user = new User(userData);
        user.save((err, newUser) => {
            console.log('user saved');
            if (err) throw err

            done();
        });
    });

    describe('POST /login', function () {

        it('should login a user', function (done) {
            let loginCreds = {
                username: userData.username,
                password: userData.password
            };
            console.log('lC:', loginCreds);

            supertest(app)
                .post('/auth/login')
                .send(loginCreds)
                .expect(200)
                .end((err, res) => {
                    console.log('post login', res.body, res.body.token);
                    expect(res.body.username).to.equal(userData.username);
                    expect(res.body.token).to.be.a('string');
                    done();
                });
        });
    });

})
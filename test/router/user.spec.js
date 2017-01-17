const routes = require('../../router/users');
const app = require('../../app');
const supertest = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');
const createJWT = require('../../middleware/auth').createJWT;
const config = require('../../config');
const User = require('../../models/user');

let userData = {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.words(1),
    loginAttempts: 0
};

describe('User Routes', function () {

    let loginToken;

    before(function (done) {
        let user = new User(userData);
        user.save((err, newUser) => {
            console.log('user saved');
            if (err) throw err
            loginToken = createJWT(newUser._id, config.APP_KEY)
            done();
        });
    });

    describe('GET /users/me', function () {
        it('should return a users data', function (done) {
            supertest(app)
                .get('/users/me')
                .set('x-access-token', loginToken)
                .expect(200)
                .end((err, res) => {
                    console.log('get me', res.body, res.status)
                    done();
                    // expect(res.body.username).to.equal(userData.username);
                });
        });

        it('should not return a logged out users data', function (done) {
            supertest(app)
                .get('/users/me')
                .expect(403)
                .end((err, res) => {
                    console.log('get me logged out', res.body, res.status)
                    done();
                    // expect(res.body.username).to.equal(userData.username);
                });
        });
    });

    describe('GET /users', function () {
        it('should have an index route', function (done) {
            supertest(app)
                .get('/users')
                .expect(200)
                .end((err, res) => {
                    done();
                    // expect(res.body.username).to.equal(userData.username);
                });
        });
    });

    describe('POST /users', function () {
        it('should create a user', function (done) {
            supertest(app)
                .post('/users')
                .send(userData)
                .expect(201)
                .end((err, res) => {
                    console.log('post', res.body);
                    expect(res.body.username).to.equal(userData.username);
                    done();
                });
        });
    });

    describe('GET /users/:id', function () {
        it('should get a user by id', function (done) {
            // 587e2c4b1005dc1e8c723af2
            supertest(app)
                .get('/users/587e2c4b1005dc1e8c723af2')
                .expect(200)
                .end((err, res) => {
                    console.log('getById', res.body);
                    expect(res.body.username).to.not.be.null;
                    done();
                });
        });
    });

});
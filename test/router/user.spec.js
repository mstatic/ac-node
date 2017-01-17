const routes = require('../../router/users');
const app = require('../../app');
const supertest = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');

let userData = {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.words(1),
    loginAttempts: 0
};

//   username: 'Aniyah.Reichert',
//   firstName: 'Jaren',
//   lastName: 'Rodriguez',
//   email: 'German_Schneider14@hotmail.com',
//   password: 'quis',
//   loginAttempts: 0,

describe('GET /user', function () {
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

describe('POST /user', function () {
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

describe('GET /user/:id', function() {
    it('should get a user by id', function(done) {
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


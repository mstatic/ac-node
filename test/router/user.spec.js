const routes = require('../../router/users');
const app = require('../../app');
const supertest = require('supertest');
const expect = require('chai').expect;

describe('User routes', function () {


    it('should have an index route', function (done) {
        supertest(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                console.log('supper test', err, res.status);
                done();
            });
    });

    
});
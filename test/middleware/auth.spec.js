const authMiddleware = require('../../middleware/auth');
const faker = require('faker');
const config = require('../../config');
const expect = require('chai').expect;
console.log(config.APP_KEY);

describe('Auth middleware', function () {
    it('should create a JWT', function () {
        let id = faker.random.uuid();
        let token = authMiddleware.createJWT(id, config.APP_KEY);

        expect(token).to.be.a('string');

        authMiddleware.verifyJWT(token, config.APP_KEY, (err, decoded) => {
            expect(err).to.be.null;
            expect(decoded.id).to.be.a('string');
            expect(decoded.id).to.be.equal(id);
        });
    });

    // it('', function () {

    // });
});
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const axios_1 = __importDefault(require("../../../test/axios"));
const seed_mongodb_1 = require("../../../test/seed-mongodb");
const user_mock_1 = require("./user.mock");
const mockUserCreateBody = {
    avatarUrl: 'avatar url',
    emailAddress: 'notareal@email.com',
    familyName: 'not a real familyname',
    givenName: 'not a real givenname',
    preferredName: 'not a real preferred name',
};
describe('User Controller', () => {
    describe('POST', () => {
        it('Should create a new user', async () => {
            const { status, data } = await axios_1.default.post('users', mockUserCreateBody);
            (0, chai_1.expect)(status).to.equal(200);
            (0, chai_1.expect)(data).to.include(mockUserCreateBody);
        });
        it('Should not create a new user with invalid properties', async () => { });
    });
    describe('GET', () => {
        before(async () => {
            await (0, seed_mongodb_1.seedCollection)('users', [user_mock_1.mockUser]);
        });
        after(async () => {
            await (0, seed_mongodb_1.cleanUpCollection)('users');
        });
        it('Should get a user', async () => {
            const { status, data } = await axios_1.default.get(`users/${user_mock_1.mockUser.userId}`);
            (0, chai_1.expect)(status).to.equal(200);
            (0, chai_1.expect)(data).to.deep.equal(user_mock_1.mockUser);
        });
        it('Should receive a 204 when no user is found', async () => {
            const { status } = await axios_1.default.get('users/not-a-real-id');
            (0, chai_1.expect)(status).to.equal(204);
        });
        it('Should find a list of users by a given attribute', async () => {
            const { status, data } = await axios_1.default.get(`users/givenName/not%20a%20real%20givenname`);
            (0, chai_1.expect)(status).to.equal(200);
            (0, chai_1.expect)(data).to.be.instanceOf(Array);
            (0, chai_1.expect)(data).to.have.length.greaterThan(0);
        });
        it('Should receive an empty list if no user matches the given attributes', async () => {
            const { status, data } = await axios_1.default.get('users/givenName/A%20Real%20Given%20Name');
            (0, chai_1.expect)(status).to.equal(200);
            (0, chai_1.expect)(data).to.be.instanceOf(Array);
            (0, chai_1.expect)(data).to.have.length(0);
        });
    });
    describe('PATCH', () => {
        before(async () => {
            await (0, seed_mongodb_1.seedCollection)('users', [user_mock_1.mockUser]);
        });
        after(async () => {
            await (0, seed_mongodb_1.cleanUpCollection)('users');
        });
        it('Should partially update an existing user', async () => {
            const { status, data } = await axios_1.default.patch(`users/${user_mock_1.mockUser.userId}`, { avatarUrl: 'A new url' });
            (0, chai_1.expect)(status).to.equal(200);
            (0, chai_1.expect)(data).to.include({ ...user_mock_1.mockUser, avatarUrl: 'A new url' });
        });
        it('Should receive a 404 if no user exists for the given userId', async () => {
            const { status } = await axios_1.default.patch('users/not-a-user-id', {});
            (0, chai_1.expect)(status).to.equal(404);
        });
    });
    describe.skip('DELETE', () => {
        it('Should delete an existing user', async () => {
            const { status } = await axios_1.default.delete(`/users/${user_mock_1.mockUser.userId}`);
            (0, chai_1.expect)(status).to.equal(204);
        });
        it('Should receive a 204 when deleting a user that does not exist', async () => {
            const { status } = await axios_1.default.delete('/users/not-a-real-id');
            (0, chai_1.expect)(status).to.equal(204);
        });
    });
});
//# sourceMappingURL=user.integration.test.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const axios_1 = __importDefault(require("../../../test/axios"));
const seed_mongodb_1 = require("../../../test/seed-mongodb");
const user_mock_1 = require("./user.mock");
describe('Controller - User', () => {
    describe('ReST Unit Tests', () => {
        before(async () => {
            await (0, seed_mongodb_1.seedCollection)('users', [user_mock_1.mockUser]);
        });
        it('Should get a user', async () => {
            try {
                console.log('fetching data');
                const { status, data } = await axios_1.default.get('users/31aee520-f06c-42ce-bda2-60ecaa8b2aff');
                console.log(data);
                (0, chai_1.expect)(status).to.equal(200);
                (0, chai_1.expect)(data).to.equal(user_mock_1.mockUser);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    });
});
//# sourceMappingURL=user.integration.test.js.map
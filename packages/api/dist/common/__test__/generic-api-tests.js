"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericApiTestFactory = void 0;
const axios_1 = __importDefault(require("../../test/axios"));
const testIf = (condition, ...args) => condition ? test(...args) : test.skip(...args);
const describeIf = (condition, ...args) => condition ? describe(...args) : describe.skip(...args);
function genericApiTestFactory(config, mockResources) {
    if (mockResources.length === 0)
        throw Error('Must provide at least one resource to test generic CRUD methods.');
    const skipSuite = (suite) => testConfig.skipSuites?.includes(suite) ?? false;
    const defaultSearchableAttributes = Object.keys(mockResources[0]).filter((key) => key !== config.primaryId);
    const testConfig = {
        getOptions: {
            searchableAttributes: defaultSearchableAttributes,
        },
        ...config,
    };
    describe(`${config.resource.toLocaleUpperCase()}`, () => {
        beforeAll(async () => {
            await testConfig.setupSuite();
        });
        beforeEach(async () => {
            await testConfig.setupData();
        });
        afterEach(async () => {
            await testConfig.cleanupData();
        });
        afterAll(async () => {
            await testConfig.teardownSuite();
        });
        describeIf(skipSuite('GET'), 'GET', () => {
            describe(`/${testConfig.resource}`, () => {
                for (const mock of mockResources) {
                    it(`/:id - should find a resource with id ${mock[testConfig.primaryId]}`, async () => {
                        const response = await axios_1.default.get(`/${testConfig.resource}/${mock[testConfig.primaryId]}`);
                        expect(response.status).toBe(200);
                        expect(response.data).toBeDefined();
                    });
                }
                it(`/:id - should not find a resource with a non-existant id`, async () => {
                    const response = await axios_1.default.get(`/${testConfig.resource}/00000000-0000-0000-0000-00000000`);
                    expect(response.status).toBe(204);
                    expect(response.data).toBeFalsy();
                });
                it.skip(`/?attribute=value`, async () => { });
            });
        });
        describeIf(skipSuite('POST'), 'POST', () => {
            describe(`/${testConfig.resource}`, () => {
                it(`/`, () => { });
            });
        });
        describeIf(skipSuite('PUT'), 'PUT', () => { });
        describeIf(skipSuite('PATCH'), 'PATCH', () => { });
        describeIf(skipSuite('DELETE'), 'DELETE', () => { });
    });
}
exports.genericApiTestFactory = genericApiTestFactory;
//# sourceMappingURL=generic-api-tests.js.map
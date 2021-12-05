import axios from '../../test/axios';

/**
 *  Generic CRUD API Test Suite
 *
 *  GET
 *    /:id
 *      - Should be able to get a resource using the provided primary ID
 *      - Should receive a 204 when a resource does not exist
 *    /?attribute=value
 *      - Should receive a list of resources matching the given attribute
 *      - Should receive an empty list if no resource matches the given attribute
 *  POST
 *    /
 *      - Should be able to create a new valid resource
 *      - Should not be able to create a user with missing or invalid properties
 *  PATCH
 *    /:id
 *      - Should be able to update each property of the resource object individually
 *      - Should not be able to update a property with in an invalid value
 *  DELETE
 *    /:id
 *      - Should be able to delete a resource given an id
 *      - Should receive a 404 when no resource exists for the given id
 */

type SuiteMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
interface GenericTestResourceConfiguration<Resource> {
  resource: string;
  primaryId: keyof Resource;
  skipSuites?: SuiteMethods[];

  setupSuite: () => Promise<void>;
  teardownSuite: () => Promise<void>;
  setupData: () => Promise<void>;
  cleanupData: () => Promise<void>;

  getOptions?: {
    searchableAttributes?: (keyof Resource)[];
  };
  postOptions?: {
    excludeProperties?: (keyof Resource)[];
  };
  putOptions?: {};
  deleteOptions?: {};
}

const testIf = (condition: boolean, ...args: Parameters<typeof test>) =>
  condition ? test(...args) : test.skip(...args);
const describeIf = (condition: boolean, ...args: Parameters<typeof describe>) =>
  condition ? describe(...args) : describe.skip(...args);

export function genericApiTestFactory<T extends Record<string, any>>(
  config: GenericTestResourceConfiguration<T>,
  mockResources: T[]
) {
  if (mockResources.length === 0)
    throw Error(
      'Must provide at least one resource to test generic CRUD methods.'
    );

  const skipSuite = (suite: SuiteMethods) =>
    testConfig.skipSuites?.includes(suite) ?? false;

  const defaultSearchableAttributes = Object.keys(mockResources[0]).filter(
    (key) => key !== config.primaryId
  );

  const testConfig: GenericTestResourceConfiguration<T> = {
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
          it(`/:id - should find a resource with id ${
            mock[testConfig.primaryId]
          }`, async () => {
            const response = await axios.get(
              `/${testConfig.resource}/${mock[testConfig.primaryId]}`
            );
            expect(response.status).toBe(200);
            expect(response.data).toBeDefined();
          });
        }
        it(`/:id - should not find a resource with a non-existant id`, async () => {
          const response = await axios.get(
            `/${testConfig.resource}/00000000-0000-0000-0000-00000000`
          );
          expect(response.status).toBe(204);
          expect(response.data).toBeFalsy();
        });
        it.skip(`/?attribute=value`, async () => {});
      });
    });

    describeIf(skipSuite('POST'), 'POST', () => {
      describe(`/${testConfig.resource}`, () => {
        it(`/`, () => {});
      });
    });
    describeIf(skipSuite('PUT'), 'PUT', () => {});
    describeIf(skipSuite('PATCH'), 'PATCH', () => {});
    describeIf(skipSuite('DELETE'), 'DELETE', () => {});
  });
}

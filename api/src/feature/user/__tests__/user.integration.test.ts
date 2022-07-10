/**
 * /user
 *  GET
 *    /:id
 *      - Should be able to get a user given an ID *** Good for TDD
 *        - Should receive a 404 if a user with a given ID is not found *** Also good for TDD, but somewhat tautological
 *    /?attribute=value
 *      - Should be able to get a list of users matching a given attribute *** Good for TDD
 *      - Should be able to find a list containing at least one user with all possible attributes specified *** Also good for TDD
 *      - Should receive an empty list if no users match the given attribute  *** Good for TDD, but somewhat tautological
 *  POST
 *    /
 *      - Should be able to create a new valid user *** Good for TDD
 *      - Should not be able to create a user with missing or invalid properties *** Of questionable value, because TSOA handles 400/422s
 *  PATCH
 *    /:id
 *      - Should be able to update each property of the user object individually *** Good for TDD
 *      - Should not be able to update a property with in an invalid value *** Of questionable value, because TSOA handles 400/422s
 *  DELETE
 *    /:id
 *      - Should be able to delete a user given an id *** Good for TDD
 *      - Should receive a 404 when no user exists for the given id *** Also good for TDD, but somewhat tautological
 */

import axios from '../../../test/axios';
import { seedCollection } from '../../../test/seed-mongodb';
import { User } from '../user.model';
import { mockUser } from './user.mock';

describe('Controller - User', () => {
  describe('ReST Unit Tests', () => {
    beforeAll(async () => {
      await seedCollection('users', [mockUser]);
    });

    it('Should get a user', async () => {
      const { status, data } = await axios.get<User>(
        `users/31aee520-f06c-42ce-bda2-60ecaa8b2aff`
      );
      expect(status).toBe(200);
      expect(data).toStrictEqual(mockUser);
    });
  });
});

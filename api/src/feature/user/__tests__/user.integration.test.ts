import { expect } from 'chai';
import axios from '../../../test/axios';
/**
 * /user
 *  GET
 *    /:id
 *      - Should be able to get a user given an ID
 *        - Should receive a 204 if a user with a given ID is not found
 *    /?attribute=value
 *      - Should be able to get a list of users matching a given attribute
 *      - Should be able to find a list containing at least one user with all possible attributes specified
 *      - Should receive an empty list if no users match the given attribute
 *  POST
 *    /
 *      - Should be able to create a new valid user
 *      - Should not be able to create a user with missing or invalid properties
 *  PATCH
 *    /:id
 *      - Should be able to update each property of the user object individually
 *      - Should not be able to update a property with in an invalid value
 *  DELETE
 *    /:id
 *      - Should be able to delete a user given an id
 *      - Should receive a 204 when no user exists for the given id
 */

import { seedCollection } from '../../../test/seed-mongodb';
import { User } from '../user.model';
import { mockBaseUser, mockUser } from './user.mock';

describe('User Controller', () => {
  before(async () => {
    await seedCollection('users', [mockUser]);
  });

  describe('GET', () => {
    it('Should get a user', async () => {
      const { status, data } = await axios.get<User>(
        `users/${mockUser.userId}`
      );
      expect(status).to.equal(200);
      expect(data).to.deep.equal(mockUser);
    });
    it('Should receive a 204 when no user is found', async () => {
      const { status } = await axios.get<User>('users/not-a-real-id');
      expect(status).to.equal(204);
    });
    it('Should find a list of users by a given attribute', async () => {
      const { status, data } = await axios.get<User[]>(
        `users/givenName/not%20a%20real%20givenname`
      );
      expect(status).to.equal(200);
      expect(data).to.be.instanceOf(Array);
      expect(data).to.have.length.greaterThan(0);
    });
    it('Should find a user using all attributes', async () => {});
    it('Should receive an empty list if no user matches the given attributes', async () => {});
  });
  describe('POST', () => {
    it('Should create a new user', async () => {
      const { status, data } = await axios.post<User>('users', mockBaseUser);
      expect(status).to.equal(200);
      expect(data).to.include(mockBaseUser);
    });
    it('Should not create a new user with invalid properties', async () => {});
  });
  describe('PATCH', () => {
    it('Should update an existing user', async () => {});
    it('Should receive a 404 if no user exists for the given userId', async () => {});
  });
  describe.skip('DELETE', () => {
    it('Should delete an existing user', async () => {
      const { status } = await axios.delete<User>(`/users/${mockUser.userId}`);
      expect(status).to.equal(204);
    });
    it('Should receive a 204 when deleting a user that does not exist', async () => {
      const { status } = await axios.delete<User>('/users/not-a-real-id');
      expect(status).to.equal(204);
    });
  });
});

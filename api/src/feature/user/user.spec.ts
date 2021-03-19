import axios from '../../test/axios';
import { getMongooseConnection } from '../../test/mongod';
import mockUsers from './user.mock.json';
import { CreateUserDTO } from './user.model';

describe('USER', () => {
  beforeEach(async () => {
    const conn = await getMongooseConnection();
    await conn.collection('users').insertMany(mockUsers);
  });

  afterEach(async () => {
    const conn = await getMongooseConnection();
    conn.collection('users').drop();
  });

  it('POST - Should create a user', async () => {
    const createTestUser: CreateUserDTO = {
      avatarUrl: '',
      emailAddress: 'notareal@email.com',
      familyName: 'last_name',
      givenName: 'first_name',
      preferredName: 'first_name last_name',
    };
    const response = await axios.post('/users', createTestUser);

    Object.getOwnPropertyNames(createTestUser).forEach((property) => {
      expect(response.data).toHaveProperty(property);
    });
  });

  it('GET - Should fetch a user with a given id', async () => {
    const response = await axios.get(
      '/users/31aee520-f06c-42ce-bda2-60ecaa8b2aff'
    );
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });

  const userPatchProperties: Array<{
    key: keyof CreateUserDTO;
    value: unknown;
  }> = [
    { key: 'avatarUrl', value: 'new avatar url' },
    { key: 'emailAddress', value: 'newemailaddress@email.com' },
    { key: 'familyName', value: 'new family name' },
    { key: 'givenName', value: 'new given name' },
    { key: 'preferredName', value: 'a new preferred name' },
  ];

  userPatchProperties.forEach((key, value) => {
    it('PATCH - Should partially update a user', async () => {
      const response = await axios.patch(
        '/users/31aee520-f06c-42ce-bda2-60ecaa8b2aff',
        {
          [key as any]: value,
        }
      );
      expect(response.status).toBe(200);
      expect(response.data).toBe({});
    });
  });
  it('DELETE - Should delete a user', async () => {
    const response = await axios.delete(
      '/users/31aee520-f06c-42ce-bda2-60ecaa8b2aff'
    );
    expect(response.status).toBe(200);
  });
});

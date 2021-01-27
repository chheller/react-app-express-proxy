import axios from '../../../test/axios';
import { CreateUserDTO } from './user.model';

describe('User Context', () => {
  beforeAll(() => {});

  it('Should create a user', async () => {
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

  it('Should fetch a user with a given id', async () => {
    const response = await axios.get('/users/12345');
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
    it('Should update a user', async () => {
      const response = await axios.patch('/users/12345', {
        [key as any]: value,
      });
      expect(response.status).toBe(200);
      expect(response.data).toBe({});
    });
  });

  it('Should partially update a user', async () => {});

  it('Should delete a user', async () => {});
});

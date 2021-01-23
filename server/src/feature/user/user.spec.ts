import axios from '../../../test/axios';
import { CreateUserDTO } from './user.model';

describe('User Context', () => {
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
    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });

  it('Should update a user', async () => {});

  it('Should partially update a user', async () => {});

  it('Should delete a user', async () => {});
});

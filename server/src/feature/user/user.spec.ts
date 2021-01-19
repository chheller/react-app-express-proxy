import axios from 'axios';

describe('User Context', () => {
  it('Should fetch a user', async () => {
    jest.setTimeout(10000);

    const response = await axios.get('/users/123', {
      baseURL: 'http://localhost:8080',
    });
    console.log(response.data);
    expect(response.status).toBe(200);
  });
});

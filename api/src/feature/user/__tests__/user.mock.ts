import { User } from '../user.model';

export const mockUser: User & { _id: string } = {
  _id: '62ca7ce79e72f0624cf8ca9e',
  userId: '31aee520-f06c-42ce-bda2-60ecaa8b2aff',
  avatarUrl: 'avatar url',
  emailAddress: 'notareal@email.com',
  familyName: 'not a real familyname',
  givenName: 'not a real givenname',
  preferredName: 'not a real preferred name',
};

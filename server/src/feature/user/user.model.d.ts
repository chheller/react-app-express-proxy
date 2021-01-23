export interface User extends CreateUserDTO {
  userId: string;
}

export interface CreateUserDTO {
  givenName: string;
  familyName: string;
  preferredName: string;
  emailAddress: string;
  avatarUrl: string;
}

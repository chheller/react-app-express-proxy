# Authentication

## Introduction

The authentication feature provides endpoints for creating, authenticating, and deleting User Authentications. A User Authentication is an entity containing authentication properties, such as the user id, password, and date modified. These properties are used to authenticate users, and manage expiring passwords.

## Design

Password hashing is handled by bcrypt, executed from worker threads to free up the main server thread to continue serving requests while the relatively cpu instensive task of hashing is performed.

Only data relevant to the user's authentication is stored in the authentication collection.

## Collection design

```js
{
  userId: ObjectId; // ObjectId of the User this authorization document refers to
  passsword: String; // Bcrypt hashed user password.
  modifiedAt: String; // ISO-8601 Datetime
  modifiedBy: ObjectId; // ObjectId pointing to User who modified the document last
}
```

## TODO

- [ ] Implement skeleton files and scaffold basic methods
- [ ] Implement POST method for new user credentials
- [ ] Implement POST method to validate a credential
- [ ] Implement PATCH method to update user passswords
- [ ] Implement DELETE method to delete a credential
- [ ] Documentation on validation constraints
- [ ] Integration test suite

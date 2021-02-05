db.createUser({
  user: 'default_user_username',
  pwd: 'default_user_password',
  roles: [
    {
      role: 'readWrite',
      db: 'default_database',
    },
  ],
});

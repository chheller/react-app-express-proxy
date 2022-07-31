db.createUser({
  user: 'mongo_admin',
  pwd: 'mongo_secret',
  roles: [
    {
      role: 'readWrite',
      db: 'default_database',
    },
  ],
});

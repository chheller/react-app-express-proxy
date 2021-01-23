import isNil from 'lodash/isNil';

const configuration = {
  cookieSecret: process.env.COOKIE_SECRET || 'a-cookie-secret',
  port: parseInt(process.env.PORT || '8080', 10),
  mongo: {
    hostname: process.env.MONGO_HOSTNAME || 'localhost',
    port: parseInt(process.env.MONGO_PORT || '27017', 10),
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE || 'default_database',
  },
  loggerLevel: process.env.LOGGER_LEVEL ?? 'info',
};

Object.entries(configuration).forEach(([key, value]) => {
  if (isNil(value)) {
    throw new Error(`Configuration was missing for ${key}`);
  }
});

export default configuration;

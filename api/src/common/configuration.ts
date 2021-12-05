import 'dotenv/config';

export interface Configuration {
  cookieSecret: string;
  port: number;
  mongo: {
    hostname: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  loggerLevel: string;
}

const config = {
  cookieSecret: process.env.COOKIE_SECRET,
  port: parseInt(process.env.PORT ?? '', 10),
  mongo: {
    hostname: process.env.MONGO_HOSTNAME,
    port: parseInt(process.env.MONGO_PORT || '', 10),
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE,
    useMemoryServer: process.env.MONGO_USE_MEMORY_DATABASE ?? false,
  },
  loggerLevel: process.env.LOGGER_LEVEL,
};

Object.entries(config).forEach(([key, value]) => {
  if (value == null || value == NaN) {
    throw new Error(`Configuration was missing for ${key}`);
  }
});

export default config;

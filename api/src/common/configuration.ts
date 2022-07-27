import 'dotenv/config';
import { importPKCS8, importSPKI, KeyLike } from 'jose';
import keysOf from './helpers/keyOf';
import { provideSingleton } from './ioc';
import Logger from './logger';

export interface IConfiguration {
  port: number;
  mongo: {
    hostname: string;
    port: number;
    username: string;
    password: string;
    database: string;
    useMemoryServer: boolean;
  };
  loggerLevel: string;
  returnValidationErrorDetails: boolean;
  returnInternalServerErrorDetails: boolean;
  jwks: { private: KeyLike; public: KeyLike }[];
}

@provideSingleton(Configuration)
export default class Configuration {
  private static logger = Logger.child({ name: 'Configuration' });
  private static _config: IConfiguration | undefined;
  public static get config(): IConfiguration {
    if (Configuration._config == null) {
      throw new Error(
        'Configuration was undefined, ensure async method initialize was run first'
      );
    }
    return Configuration._config;
  }
  constructor() {}

  private static resolveConfiguration() {
    const requiredParameters = [
      'RSA_PRIVATE_SIGNING_KEY',
      'RSA_PUBLIC_SIGNING_KEY',
      'MONGO_HOSTNAME',
      'MONGO_USERNAME',
      'MONGO_PASSWORD',
      'MONGO_DATABASE',
    ] as const;

    const optionalParameters = {
      PORT: '8080',
      LOGGER_LEVEL: 'error',
      RETURN_VALIDATION_ERROR_DETAILS: 'false',
      RETURN_INTERNAL_SERVER_ERROR_DETAILS: 'false',
      MONGO_PORT: '27017',
      MONGO_USE_MEMORY_DATABASE: 'false',
    } as const;

    const resolvedConfigs = {} as Record<
      typeof requiredParameters[number] | keyof typeof optionalParameters,
      string
    >;

    const missingRequiredParameters: Partial<
      typeof requiredParameters[number]
    >[] = [];

    Configuration.logger.debug(`Resolving required configurations.`);
    for (const requiredParameter of requiredParameters) {
      const resolvedConfig = process.env[requiredParameter];
      if (resolvedConfig == null) {
        Configuration.logger.error(
          `Configuration ${requiredParameter} was not defined.`
        );
        missingRequiredParameters.push(requiredParameter);
      } else {
        resolvedConfigs[requiredParameter] = resolvedConfig;
      }
    }

    if (missingRequiredParameters.length > 0) {
      Configuration.logger.error(
        `Failed to resolve some required configurations`,
        {
          missingRequiredParameters,
        }
      );
      throw new Error(`Required Configuration Missing`);
    }

    const missingOptionalParameters: Partial<
      keyof typeof optionalParameters
    >[] = [];
    Configuration.logger.debug(`Resolving optional configurations.`);

    for (const optionalParam of keysOf(optionalParameters)) {
      const resolvedConfig = process.env[optionalParam];
      if (resolvedConfig == null) {
        Configuration.logger.debug(
          `Configuration ${optionalParam} was not defined, using default configuration ${optionalParameters[optionalParam]}`
        );
        missingOptionalParameters.push(optionalParam);
        resolvedConfigs[optionalParam] = optionalParameters[optionalParam];
      } else {
        resolvedConfigs[optionalParam] = resolvedConfig;
      }
    }

    if (missingOptionalParameters.length > 0) {
      Configuration.logger.warn(
        `Failed to resolve some optional configurations`,
        {
          missingOptionalParameters,
        }
      );
    }

    return resolvedConfigs;
  }

  static async initializeConfiguration() {
    Configuration.logger.debug('Initializing service configuration');
    const {
      PORT,
      LOGGER_LEVEL,
      RSA_PRIVATE_SIGNING_KEY,
      RSA_PUBLIC_SIGNING_KEY,
      RETURN_VALIDATION_ERROR_DETAILS,
      RETURN_INTERNAL_SERVER_ERROR_DETAILS,
      MONGO_PORT,
      MONGO_HOSTNAME,
      MONGO_USERNAME,
      MONGO_PASSWORD,
      MONGO_DATABASE,
      MONGO_USE_MEMORY_DATABASE,
    } = Configuration.resolveConfiguration();

    Configuration._config = {
      port: parseInt(PORT, 10),
      mongo: {
        hostname: MONGO_HOSTNAME,
        port: parseInt(MONGO_PORT, 10),
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        database: MONGO_DATABASE,
        useMemoryServer: MONGO_USE_MEMORY_DATABASE == 'true',
      },
      loggerLevel: LOGGER_LEVEL,
      returnValidationErrorDetails: RETURN_VALIDATION_ERROR_DETAILS == 'true',
      returnInternalServerErrorDetails:
        RETURN_INTERNAL_SERVER_ERROR_DETAILS == 'true',
      jwks: [
        {
          private: await importPKCS8(RSA_PRIVATE_SIGNING_KEY, 'RS256'),
          public: await importSPKI(RSA_PUBLIC_SIGNING_KEY, 'RS256'),
        },
      ],
    };
  }
}

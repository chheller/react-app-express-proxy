import { NextFunction, Request, Response, Router } from 'express';
import { inject } from 'inversify';
import { ValidateError } from 'tsoa';
import { IConfiguration } from '../common/configuration';
import { provideSingleton } from '../common/ioc';
import Logger from '../common/logger';

@provideSingleton(ErrorMiddleware)
export default class ErrorMiddleware {
  private logger = Logger.child({ name: 'ErrorMiddleware' });

  constructor(@inject('configuration') private configuration: IConfiguration) {}

  public registerMiddleware(app: Router) {
    app.use(this.error400Middleware.bind(this));
    app.use(this.error500Middleware.bind(this));
    app.use(this.error404Middleware.bind(this));
  }

  // TODO: Find a better way to fit this into the Depency injector
  private error400Middleware(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof ValidateError) {
      this.logger.warn(err.message, {
        fields: err.fields,
      });
      // TODO: Test that middleware only returns details when environment explicitly enables it
      return res.status(err.status).json({
        message: 'Validation Failed',
        // Return the details of the validation only if enabled in the environment e.g. in dev
        ...(this.configuration.returnValidationErrorDetails
          ? { details: err.fields }
          : {}),
      });
    }
    return next(err);
  }
  private error500Middleware(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.logger.error(err);
    // TODO: Test that middleware only returns details when environment explicitly enables it
    return res.status(500).json({
      message: 'Internal Server Error',
      // Return the details of the validation only if enabled in the environment e.g. in dev
      ...(this.configuration.returnInternalServerErrorDetails
        ? { details: err }
        : {}),
    });
  }

  private error404Middleware(req: Request, res: Response) {
    this.logger.error('Route not found', { url: req.originalUrl });
    return res.status(404).send(`${req.originalUrl} not found`);
  }
}

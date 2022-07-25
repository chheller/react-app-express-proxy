import { Body, Post, Response, Route, SuccessResponse } from 'tsoa';
import { inject, provideSingleton } from '../../common/ioc';
import { NotImplementedResponse } from '../../common/response';
import BaseController from '../base-controller';
import {
  CreateAuthenticationBody,
  ValidateCredentailBody,
} from './authentication.model';
import AuthenticationService from './authentication.service';

@Route('/authentication')
@provideSingleton(AuthenticationController)
export default class AuthenticationController extends BaseController {
  constructor(
    @inject(AuthenticationService) private service: AuthenticationService
  ) {
    super();
  }

  /**
   * Endpoint for creating new credentials. Required information is the userId that corresponds to the
   * user for which the credential is being created, and the password. Additionally, the user who
   * is creating is this credential is required. The user creating the credential must either match
   * the userId for which the credential is being created, or must already exist in the User collection.
   *
   * The maximum password length is 71 bytes, as this is the maximum BCrypt supports in addition to
   * preventing a denial-of-service against the authentcation endpoint by preventing unnecessarily large
   * passwords from being passed through the hashing function
   * @param {CreateAuthenticationBody} body
   */
  @Post()
  @SuccessResponse(201, 'Created')
  public async createNewCredential(
    @Body() body: CreateAuthenticationBody
  ): Promise<void> {
    throw new NotImplementedResponse();
  }
  // This should return a JWT, as that is the point of validating a credential
  /** Endpoint for validating a user credential */
  @Post('/validate')
  @SuccessResponse(204, 'Success')
  @Response(401, 'Unauthorizated')
  public async validateCredential(@Body() body: ValidateCredentailBody) {
    throw new NotImplementedResponse();
  }
}
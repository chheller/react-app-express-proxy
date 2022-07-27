import { inject } from 'inversify';
import { Body, Get, Post, Response, Route, SuccessResponse } from 'tsoa';
import { provideSingleton } from '../../common/ioc';
import { NotImplementedResponse } from '../../common/response';
import BaseController from '../base-controller';
import {
  CreateAuthenticationBody,
  ValidateCredentialBody,
} from './authentication.model';
import AuthenticationService from './authentication.service';

@Route('/authentication')
@provideSingleton(AuthenticationController)
export class AuthenticationController extends BaseController {
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
  /**
   * Validates a user credential. Returns an RSASSA-PKC1S-SHA256 signed JWT as a secure, http-only, https cookie
   * upon successful validation of a user's credentials. They keyId property can be used to lookup the public
   * signing key for self-verification
   */
  @Post('/authenticate')
  @SuccessResponse(204, 'Success')
  @Response(401, 'Unauthorizated')
  public async validateCredential(@Body() body: ValidateCredentialBody) {
    throw new NotImplementedResponse();
  }

  /**
   * Returns the public signing key
   */
  @Get('/jwks')
  @SuccessResponse(200, 'Success')
  public async getVerificationKey() {
    throw new NotImplementedResponse();
  }
}

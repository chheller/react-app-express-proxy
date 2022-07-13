import { Controller } from 'tsoa';
import Logger from '../common/logger';

export default class BaseController extends Controller {
  protected logger = Logger.child({ name: this.constructor.name });
}

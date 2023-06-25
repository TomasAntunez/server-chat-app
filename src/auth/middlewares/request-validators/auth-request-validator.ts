import { Request, Response, NextFunction } from 'express'

import { CustomRequestValidator } from '../../';
import { AuthRequestSchemes } from './request-schemes';


export class AuthRequestValidator extends CustomRequestValidator {

  private requestSchemes = new AuthRequestSchemes();


  public register( req: Request, res: Response, next: NextFunction ) {
    this.executeValidation({
      req, res, next,
      locations: ['body'],
      scheme: this.requestSchemes.registerScheme
    });
  }

  // public login( req: Request, res: Response, next: NextFunction ) {

  // }

}

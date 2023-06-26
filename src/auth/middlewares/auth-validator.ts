import { Request, Response, NextFunction } from 'express';

import { JSONWebToken, ResponseError } from '../';
import { getAuthErrors } from '../utils';


export class AuthValidator {

  private jwt = new JSONWebToken();
  

  public async validateAccessToken( req: Request, res: Response, next: NextFunction ) {

    let accessToken: string | undefined;

    try {
      accessToken = req.header('x-token');
      if ( !accessToken ) throw new Error();

      const { id } = await this.jwt.validate( accessToken );

      req.userId = id;

      next();

    } catch (error) {
      ResponseError.sendHttpError( res, new ResponseError( 401, getAuthErrors( accessToken )));
    }
  }

}

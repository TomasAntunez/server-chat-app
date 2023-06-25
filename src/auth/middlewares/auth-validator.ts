import { Request, Response, NextFunction } from 'express';

import { JSONWebToken } from '../../utils';


export class AuthValidator {

  private jwt = new JSONWebToken();

  public async validateAccessToken( req: Request, res: Response, next: NextFunction ) {
    try {
      const accessToken = req.header('x-token');
      if ( !accessToken ) throw new Error();

      const { id } = await this.jwt.validate( accessToken );

      req.userId = id;

      next();

    } catch (error) {
      console.log(error);
      res.status(401).json({ ok: false, msg: 'Invalid access' });
    }
  }

}

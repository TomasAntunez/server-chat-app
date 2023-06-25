/*
  path: /api/auth
*/
import { NextFunction, Request, Response } from 'express';
import { CustomRouter } from './';
import { AuthController } from './controllers';
import { AuthRequestValidator, AuthValidator } from './middlewares';


export class AuthRouter extends CustomRouter<AuthController> {

  private requestValidator = new AuthRequestValidator();
  private authValidator = new AuthValidator();


  constructor() {
    super( new AuthController )
  }


  setRoutes(): void {
    this.router.post( '/register',
      [
        (req: Request, res: Response, next: NextFunction) =>
          this.requestValidator.register(req, res, next)
      ],
      (req: Request, res: Response) => this.controller.register(req, res)
    );

    this.router.post( '/login',
      (req: Request, res: Response) => this.controller.login(req, res)
    );

    this.router.get( '/renew',
      [
        (req: Request, res: Response, next: NextFunction) =>
          this.authValidator.validateAccessToken(req, res, next)
      ],
      (req: Request, res: Response) => this.controller.renewAccess(req, res)
    );
  }

}

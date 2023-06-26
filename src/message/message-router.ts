/*
  path: /api/messages
*/
import { NextFunction, Request, Response } from 'express';
import { CustomRouter } from '../custom';
import { MessageController } from './controllers';
import { AuthValidator } from '../auth';


export class MessageRouter extends CustomRouter<MessageController> {

  private authValidator = new AuthValidator();

  
  constructor() {
    super( new MessageController );
  }


  setRoutes(): void {
    this.router.get( '/:from',
    [
      (req: Request, res: Response, next: NextFunction) =>
        this.authValidator.validateAccessToken(req, res, next)
    ],
      (req: Request, res: Response) => this.controller.getMessages(req, res)
    );
  }

}

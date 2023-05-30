/*
    path: /api/messages
*/
import { MainRouter } from './router';
import { MessageController } from '../controllers/message-controller';
import { AuthValidator } from '../middlewares/auth-validator';


export class MessageRouter extends MainRouter<MessageController> {

    constructor() {
        super( new MessageController );
    }

    protected setRoutes(): void {
        this.router.get( '/:from', AuthValidator.validateAccessToken, this.controller.getMessages );
    }

}

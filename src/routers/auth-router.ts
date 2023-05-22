/*
    path: /api/auth
*/
import { MainRouter } from './router';
import { AuthController } from '../controllers/auth-controller';
import { RequestValidator } from '../middlewares/request-validator';


export class AuthRouter extends MainRouter<AuthController> {

    constructor() {
        super( new AuthController )
    }


    protected setRoutes(): void {
        this.router.post( '/register', RequestValidator.validateRegister, this.controller.register );
        this.router.post( '/login', RequestValidator.validateLogin, this.controller.login );
        this.router.get( '/renew', this.controller.renewAccess );
    }

}

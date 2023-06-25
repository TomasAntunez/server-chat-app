import { Router } from 'express';


export abstract class CustomRouter<Controller> {

    public router: Router = Router();

    constructor(
        protected controller: Controller
    ) {
        this.setRoutes();
    }

    protected setRoutes() {}

}

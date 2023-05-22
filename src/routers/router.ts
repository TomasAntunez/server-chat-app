import { Router } from 'express';


export abstract class MainRouter<TController> {

    public router: Router = Router();

    constructor( protected controller: TController ) {
        this.setRoutes();
    }

    protected setRoutes() {}

}


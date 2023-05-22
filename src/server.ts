import { createServer, Server as HTTPServer } from 'http';
import express, { Application } from 'express';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';

import { Sockets } from './sockets';
import { Environment } from './config/environment-variables';
import { AuthRouter } from './routers/auth-router';


export class ServerBootstrap extends Environment {

    private app: Application = express();
    private port: number = Number(this.getEnvVariable('PORT')) || 5000;

    private server: HTTPServer = createServer( this.app );
    private io = new SocketServer( this.server );

    private sockets = new Sockets(this.io);

    private authRouter = new AuthRouter();


    constructor() {
        super();
        this.setMiddlewares();
        this.setRouters();

        this.sockets.setEvents()
    }


    private setMiddlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    private setRouters() {
        this.app.use( '/api/auth',  this.authRouter.router );
    }

    public run() {
        this.server.listen( this.port, () => {
            console.log( `Server running on port ${this.port}` );
        });
    }

}
import { createServer, Server as HTTPServer } from 'http';
import express, { Application, Request, Response, NextFunction } from 'express';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';

import { Sockets } from './sockets';
import { Environment } from './config/environment-variables';
import { AuthRouter } from './routers/auth-router';
import { MessageRouter } from './routers/message-router';


export class ServerBootstrap extends Environment {

    private app: Application = express();
    private port: number = Number(this.getEnvVariable('PORT')) || 5000;

    private server: HTTPServer = createServer( this.app );
    private io = new SocketServer( this.server );

    private sockets = new Sockets(this.io);

    private authRouter = new AuthRouter();
    private messageRouter = new MessageRouter();


    constructor() {
        super();
        this.setMiddlewares();
        this.setRouters();

        this.sockets.setEvents()
    }


    private errorHandling( error: Error, req: Request, res: Response, next: NextFunction ) {
        if ( error ) {
            if ( error instanceof SyntaxError ) {
                return res.status(400).json({ ok: false, msg: 'Syntax error, invalid JSON format' });
            }
            console.log(error);
            return res.status(500).json({ ok: false, msg: 'Server error' });
        }
        next();
    }

    private setMiddlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use( this.errorHandling );
    }

    private setRouters() {
        this.app.use( '/api/auth', this.authRouter.router );
        this.app.use( '/api/messages', this.messageRouter.router );
    }

    public run() {
        this.server.listen( this.port, () => {
            console.log( `Server running on port ${this.port}` );
        });
    }

}
import { createServer, Server as HTTPServer } from 'http';
import express, { Application, Request, Response, NextFunction } from 'express';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';

import { Sockets } from './sockets';
import { Environment } from './config';
import { AuthRouter } from './auth';
import { MessageRouter } from './message';
import { routers } from './routes';


export class ServerBootstrap extends Environment {

    private app: Application = express();
    private port: number = this.env.PORT || 5000;

    private server: HTTPServer = createServer( this.app );
    private io = new SocketServer( this.server );

    private sockets = new Sockets(this.io);


    private authRouter = new AuthRouter();
    private messgaeRouter = new MessageRouter();


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
        routers.forEach( router => {
            this.app.use( `/api${ router[0] || '' }`, router[1] );
        });
    }

    public run() {
        this.server.listen( this.port, () => {
            console.log( `Server running on port ${this.port}` );
        });
    }

}
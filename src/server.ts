import { createServer, Server as HTTPServer } from 'http';
import express, { Application } from 'express';
import { Server as SocketServer } from 'socket.io';

import { Sockets } from './sockets';
import { Environment } from './config/environment-variables';


export class ServerBootstrap extends Environment {

    private app: Application = express();
    private port: number = Number(process.env.PORT) || 5000; // TODO: Config botenv

    private server: HTTPServer = createServer( this.app );
    private io = new SocketServer( this.server );

    private sockets = new Sockets(this.io);


    constructor() {
        super();
        this.setMiddlewares();

        this.sockets.setEvents()
    }


    private setMiddlewares() {
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    public run() {
        this.server.listen( this.port, () => {
            console.log( `Server running on port ${this.port}` );
        });
    }

}
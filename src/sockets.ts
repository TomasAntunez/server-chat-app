import { Socket, Server as SocketServer } from 'socket.io';

import { JSONWebToken } from './utils/jwt';
import { UserServices } from './user';


export class Sockets {

    private userServices = new UserServices();
    private jwt = new JSONWebToken();

    constructor(
        private io: SocketServer
    ) {}


    public setEvents() {

        this.io.on( 'connection', async (socket: Socket) => {

            console.log('client connected');

            let userId: string;

            try {
                userId = (await this.jwt.validate( socket.handshake.query['x-token'] as string )).id;
            } catch (error) {
                console.log('invalid socket, disconnected');
                return socket.disconnect();
            }

            await this.userServices.setUserOnline( userId, true );


            // TODO: validate JWT
            // If token is not valid, desconnect client

            // TODO: know which user is active

            // TODO: emit all users connected

            // TODO: Socket join

            // TODO: listen when client send a message
            // personal-message

            // TODO: Disconnect
            // mark in the database that the user logged out

            socket.on( 'disconnect', async () => {
                await this.userServices.setUserOnline( userId, false );
                console.log('client disconnected');
            });
        });
        
    }

}
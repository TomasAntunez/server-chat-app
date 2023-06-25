import { Socket, Server as SocketServer } from 'socket.io';

<<<<<<< HEAD
import { jwt } from './utils/jwt';
import { SocketController } from './controllers/socket-controller';
=======
import { JSONWebToken } from './utils/jwt';
import { UserServices } from './user';
>>>>>>> feat/socket-auth


export class Sockets {

<<<<<<< HEAD
    private controller = new SocketController();
=======
    private userServices = new UserServices();
    private jwt = new JSONWebToken();
>>>>>>> feat/socket-auth

    constructor(
        private io: SocketServer
    ) {}


    public setEvents() {

        this.io.on( 'connection', async (socket: Socket) => {

            console.log('client connected');

            let userId: string;

            try {
<<<<<<< HEAD
                userId = (await jwt.validate( socket.handshake.query['x-token'] as string )).id;
=======
                userId = (await this.jwt.validate( socket.handshake.query['x-token'] as string )).id;
>>>>>>> feat/socket-auth
            } catch (error) {
                console.log('invalid socket, disconnected');
                return socket.disconnect();
            }

<<<<<<< HEAD
            await this.controller.connectUser( userId );
=======
            await this.userServices.setUserOnline( userId, true );
>>>>>>> feat/socket-auth


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
<<<<<<< HEAD
                await this.controller.disconnectUser( userId );
=======
                await this.userServices.setUserOnline( userId, false );
>>>>>>> feat/socket-auth
                console.log('client disconnected');
            });
        });
        
    }

}
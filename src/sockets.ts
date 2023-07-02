import { Socket, Server as SocketServer } from 'socket.io';

import { JSONWebToken } from './utils';
import { UserServices } from './user';
import { MessageServices, MessagePayload } from './message';


export class Sockets {

    private userService = new UserServices();
    private messageService = new MessageServices();
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

            await this.userService.setUserOnline( userId, true );

            // Socket join
            socket.join( userId );


            this.io.emit( 'user-list', await this.userService.getUsers() );


            socket.on( 'personal-message', async (payload: MessagePayload) => {
                const response = await this.messageService.saveMessage( payload );
                console.log(response);

                if (response.ok) {
                    this.io.to( <string>response.message?.to?.toString() )
                        .emit( 'personal-message', response.message );
                    this.io.to( <string>response.message?.from?.toString() )
                        .emit( 'personal-message', response.message );
                }
                
            });


            // TODO: listen when client send a message
            // personal-message

            socket.on( 'disconnect', async () => {
                await this.userService.setUserOnline( userId, false );
                this.io.emit( 'user-list', await this.userService.getUsers() );
                console.log('client disconnected');
            });
        });
        
    }

}
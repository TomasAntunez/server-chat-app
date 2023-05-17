import { Socket, Server as SocketServer } from 'socket.io';


export class Sockets {

    constructor( private io: SocketServer ) {
        this.setSocketEvents();
    }


    private setSocketEvents() {

        this.io.on( 'connection', (socket: Socket) => {

            console.log( 'Client connected' );

            socket.on( 'client-message', data => {
                console.log(data);
            });

            socket.emit( 'server-message', { message: 'Hi from server' } );

        });

    }

}
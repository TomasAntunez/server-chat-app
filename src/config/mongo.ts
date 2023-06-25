import { connect, ConnectOptions } from 'mongoose';

import { Environment } from './environment-variables';


export class MongoDB extends Environment {

    private uri: string = this.env.MONGO_URI;
    private options: ConnectOptions = {
        dbName: this.env.MONGO_DB_NAME,
        user: this.env.MONGO_USER,
        pass: this.env.MONGO_PASS
    };


    public async connectDB() {
        await connect( this.uri, this.options );
        console.log('DB connected');
    }

}

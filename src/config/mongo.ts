import { connect, ConnectOptions } from 'mongoose';

import { Environment } from './environment-variables';


export class MongoDB extends Environment {

    private uri: string | undefined = this.getEnvVariable('MONGO_URI');
    private options: ConnectOptions = {
        dbName: this.getEnvVariable('MONGO_DB_NAME'),
        user: this.getEnvVariable('MONGO_USER'),
        pass: this.getEnvVariable('MONGO_PASS')
    };


    public async connectDB() {
        await connect( <string>this.uri, this.options );
        console.log('DB connected');
    }

}

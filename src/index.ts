import { exit } from 'node:process';
import { ServerBootstrap } from "./server";
import { MongoDB } from './config/mongo';


const serverBootstrap = new ServerBootstrap();
const db = new MongoDB();


( async () => {

    try {
        await db.connectDB()
        serverBootstrap.run();

    } catch (error) {
        console.log(error);
        exit(1);
    }

})();

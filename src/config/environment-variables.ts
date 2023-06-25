import { config } from 'dotenv';


export abstract class Environment {
    
    protected env = process.env;
    
    constructor() {
        config({ path: this.path });
    }

    private get path(): string {
        let nodeEnv = this.env.NODE_ENV;
        if (!nodeEnv) {
            nodeEnv = 'development';
        }

        return `.env.${nodeEnv}`;
    }

}

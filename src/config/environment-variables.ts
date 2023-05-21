import { env } from 'node:process';
import { config } from 'dotenv';


export abstract class Environment {

    constructor() {
        config({ path: '.env' });
    }


    protected getEnvVariable(variable: string): string | undefined {
        return env[variable];
    }

}

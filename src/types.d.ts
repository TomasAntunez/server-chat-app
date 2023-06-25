
declare namespace Express {
    export interface Request {
        userId?: string;
    }
}

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: number;
        JWT_KEY: string;
        MONGO_URI: string;
        MONGO_DB_NAME: string;
        MONGO_USER: string;
        MONGO_PASS: string;
    }
}

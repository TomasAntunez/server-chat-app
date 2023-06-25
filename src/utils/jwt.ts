import { sign, verify, Secret } from 'jsonwebtoken';

import { Environment } from '../config/environment-variables';


export type Payload = { id: string };


export class JSONWebToken extends Environment {

    private secretKey: Secret = this.env.JWT_KEY;


    generate( payload: Payload ): Promise<string | Error> {

        return new Promise( (resolve, reject) => {

            sign( payload, this.secretKey, {
                expiresIn: '24h'

            }, ( error, token ) => {
                if ( error ) return reject(error);
                resolve( <string>token );
            });
        });
    }

    validate( token: string ): Promise<Payload> {

        return new Promise( (resolve, reject) => {
            verify( token, this.secretKey, ( error, decoded ) => {
                if ( error ) return reject(error);
                resolve( <Payload>decoded );
            })
        });
    }

}

import { sign, verify, Secret, JwtPayload, VerifyErrors } from 'jsonwebtoken';

import { Environment } from '../config/environment-variables';


export type Payload = { id: string };


class JSONWebToken extends Environment {

    private secretKey: Secret = <string>this.getEnvVariable('JWT_KEY');


    public generate( payload: Payload ): Promise<string | Error> {

        return new Promise( (resolve, reject) => {

            sign( payload, this.secretKey, {
                expiresIn: '24h'

            }, ( error, token ) => {
                if ( error ) return reject(error);
                resolve( <string>token );
            });
        });
    }

    public validate( token: string ): Promise<Payload | VerifyErrors> {

        return new Promise( (resolve, reject) => {
            verify( token, this.secretKey, ( error, decoded ) => {
                if ( error ) return reject(error);
                resolve( <Payload>decoded );
            })
        });
    }

}


export const jwt = new JSONWebToken();

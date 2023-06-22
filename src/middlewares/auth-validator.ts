import { Request, Response, NextFunction } from 'express';

import { jwt } from '../utils/jwt';


export class AuthValidator {

    public static async validateAccessToken( req: Request, res: Response, next: NextFunction ) {
        try {
            const accessToken = req.header('x-token');
            if ( !accessToken ) {
                throw new Error();
            }

            const { id } = await jwt.validate( accessToken );

            req.userId = id;

            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({ ok: false, msg: 'Invalid access' });
        }
    }

}

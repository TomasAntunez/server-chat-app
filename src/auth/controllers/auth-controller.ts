import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcryptjs';

import { User, JSONWebToken, ResponseError } from '../';
import { getLoginErrors, getAuthErrors } from '../utils';


export class AuthController {

    private jwt = new JSONWebToken();


    public async register( { body }: Request, res: Response ) {
        try {
            const { email } = body;

            const userExists = await User.findOne({ email });
            if ( userExists ) {
                throw new ResponseError( 400, [{
                    location: 'body',
                    param: 'email',
                    msg: 'This email is already in use',
                    value: email,
                }]);
            }

            const user = new User(body);

            const salt = await genSalt();
            user.password = await hash( user.password, salt );

            await user.save();

            const token = await this.jwt.generate({ id: user.id });

            res.status(201).json({ ok: true, user, token });

        } catch (error) {
            ResponseError.sendHttpError( res, error );
        }
    }


    public async login( { body }: Request, res: Response ) {

        const { email, password } = body;

        try {
            const user = await User.findOne({ email });
            if ( !user ) {
                throw new ResponseError( 403, getLoginErrors({ email, password }));
            }

            const validPassword = await compare( password, user.password );
            if ( !validPassword ) {
                throw new ResponseError( 403, getLoginErrors({ email, password }));
            }

            const token = await this.jwt.generate({ id: user.id });
            
            res.status(200).json({ ok: true, user, token });

        } catch (error) {
            ResponseError.sendHttpError( res, error );
        }
    }
    

    public async renewAccess( req: Request, res: Response ) {
        try {
            const id = <string>req.userId;

            const user = await User.findById( id );
            if ( !user ) {
                throw new ResponseError( 401, getAuthErrors(req.header('x-token')) );
            }
    
            const token = await this.jwt.generate({ id });
    
            res.json({
                ok: true,
                user,
                token
            });          

        } catch (error) {
            ResponseError.sendHttpError( res, error );
        }
    }

}

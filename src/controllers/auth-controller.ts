import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcryptjs';

import { User } from '../models/user';
import { jwt } from '../utils/jwt';


export class AuthController {

    public async register( { body }: Request, res: Response ) {
        try {
            const { email } = body;

            const userExists = await User.findOne({ email });
            if ( userExists ) {
                return res.status(400).json({ ok: false, msg: 'This email is already in use' });
            }

            const user = new User(body);

            const salt = await genSalt();
            user.password = await hash( user.password, salt );

            await user.save();

            const token = await jwt.generate({ id: user.id });

            res.status(201).json({ ok: true, user, token });

        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, msg: 'Server error' })
        }
    }


    public async login( { body }: Request, res: Response ) {

        const { email, password } = body;

        try {
            const user = await User.findOne({ email });
            if ( !user ) {
                return res.status(404).json({ ok: false, msg: 'Email no encontrado' });
            }

            const validPassword = await compare( password, user.password );
            if ( !validPassword ) {
                return res.status(400).json({ ok: false, msg: 'Password is invalid' });
            }

            const token = await jwt.generate({ id: user.id });
            
            res.status(200).json({ ok: true, user, token });

        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, msg: 'Server error' })
        }
    }
    

    public async renewAccess( req: Request, res: Response ) {

        const id = <string>req.userId;

        const user = await User.findById( id );
        if ( !user ) {
            return res.status(404).json({ ok: false, msg: 'User not found' });
        }

        const token = await jwt.generate({ id });

        res.json({
            ok: true,
            token
        });
    }

}

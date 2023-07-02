import { Request, Response } from 'express';

import { Message } from '../models';
import { ResponseError } from '../';


export class MessageController {

    public async getMessages( { userId, params }: Request, res: Response ) {
        const { from } = params;

        try {
            const lastThirtyMessages = await Message.find({
                $or: [
                    { from: userId, to: from },
                    { from, to: userId }
                ]
            }).sort({ createdAt: 'asc' }).limit( 30 );
    
            res.status(200).json({ ok: true, messages: lastThirtyMessages });       

        } catch (error) {
            ResponseError.sendHttpError(res, error);
        }
    }

}

import { Request, Response } from 'express';

import { Message } from '../models/message';


export class MessageController {

    public async getMessages( { userId, params: { from } }: Request, res: Response ) {
        try {
            const lastThirtyMessages = await Message.find({
                $or: [
                    { from: userId, to: from },
                    { from, to: userId }
                ]
            }).sort({ createdAt: 'desc' }).limit( 30 );
    
            res.status(200).json({ ok: true, messages: lastThirtyMessages });       

        } catch (error) {
            console.log(error);
        }
    }

}

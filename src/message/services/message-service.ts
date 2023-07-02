import { Message } from '../models';
import { MessagePayload } from '../types';


export class MessageServices {

  async saveMessage( payload: MessagePayload ) {
    try {
      const message = new Message(payload);
      await message.save();

      return {
        ok: true,
        message
      }

    } catch (error) {
      console.log(error);
      return { ok: false, msg: 'Server error' };
    }
  }

}

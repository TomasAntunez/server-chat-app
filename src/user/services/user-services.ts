import { User } from '../models';


export class UserServices {

  public setUserOnline = async ( id: string, online: boolean ) => {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error();

      user.online = online;
      await user.save();

      return user;
      
    } catch (error) {
      console.log(error);
      return { ok: false, msg: 'Server error' };
    }
  }

}

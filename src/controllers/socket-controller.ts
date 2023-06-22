import { User } from '../models/user';


export class SocketController {

  private setUserConnection = async ( id: string, connected: boolean ) => {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error();

      user.online = connected;
      await user.save();

      return user;
      
    } catch (error) {
      console.log(error);
      return { ok: false, msg: 'Server error' };
    }
  }


  public connectUser = async (id: string) => {
    return await this.setUserConnection( id, true );
  }

  public disconnectUser = async (id: string) => {
    return await this.setUserConnection( id, false );
  }

}

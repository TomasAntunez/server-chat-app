import { Response } from 'express';
import { Location } from 'express-validator';


export type CustomError = {
  msg: string;
  value?: string;
  param?: string;
  location?: Location
}

export class ResponseError {

  constructor(
    public status: number,
    public errors: Array<CustomError>
  ) {}


  private static get serverError() {
    return new ResponseError( 500, [{ msg: 'Server Error' }] );
  }

  public static sendHttpError(
    res: Response,
    responseError: unknown = this.serverError
  ) {
    // console.log(responseError);

    if ( responseError instanceof ResponseError ) {
      return res.status(responseError.status).json({ errors: responseError.errors });
    }

    const serverError = this.serverError;
    return res.status(serverError.status).json({ errors: serverError.errors });
  }
}

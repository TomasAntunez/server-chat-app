import { RequestScheme } from '../';


export class AuthRequestSchemes {

  public registerScheme: RequestScheme = {
    name: {
      errorMessage: 'The name is required',
      isString: true,
      trim: true,
      notEmpty: true,
      isLength: {
        options: { min: 3, max: 30 },
        errorMessage: 'The name must be between 6 and 30 characters'
      }
    },
    email: {
      errorMessage: 'The email is required',
      isString: true,
      trim: true,
      notEmpty: true,
      isEmail: {
        errorMessage: 'The email must be valid',
      },
      toLowerCase: true
    },
    password: {
      errorMessage: 'The password is required',
      isString: true,
      notEmpty: true,
      isLength: {
        options: { min: 6, max: 30 },
        errorMessage: 'The password must be between 6 and 30 characters'
      }
    }
  };


  public loginScheme: RequestScheme = {
    email: {
      isString: { bail: { level: 'request' } },
      trim: true,
      notEmpty: { bail: { level: 'request' } },
      isEmail: { bail: { level: 'request' } },
      toLowerCase: true
    },
    password: {
      isString: { bail: { level: 'request' } },
      notEmpty: { bail: { level: 'request' } },
      isLength: {
        options: { min: 6, max: 30 },
        bail: { level: 'request' }
      }
    }
  }

}

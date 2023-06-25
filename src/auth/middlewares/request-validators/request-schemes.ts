import { Request, Response, NextFunction } from 'express';
import { RequestScheme } from '../../';


export class AuthRequestSchemes {

  public registerScheme: RequestScheme = {
    name: {
      errorMessage: 'The name is required',
      isString: true,
      notEmpty: true,
      isLength: {
        options: { min: 3, max: 30 },
        errorMessage: 'The name must be between 6 and 30 characters'
      }
    },
    email: {
      isString: true,
      notEmpty: {
        errorMessage: 'The email is required'
      },
      isEmail: {
        errorMessage: 'The email must be valid',
      }
    },
    password: {
      isString: true,
      notEmpty: {
        errorMessage: 'The password is required'
      },
      isLength: {
        options: { min: 6, max: 30 },
        errorMessage: 'The password must be between 6 and 30 characters'
      }
    }
  };

}

import { Request, Response, NextFunction } from 'express';
import {
  ExpressValidator,
  CustomSchema,
  Location,
  Result,
  ValidationError,
  ErrorFormatter,
  matchedData
} from 'express-validator';

import { ResponseError, CustomError } from '../utils';


const errorFormatter: ErrorFormatter<CustomError> = error => {
  let customError: CustomError = { msg: 'Invalid data' };

  if (error.type === 'field') {
    customError = {
      location: error.location,
      param: error.path,
      msg: error.msg,
      value: error.value
    };
  }

  return customError;
};


const customValidator = new ExpressValidator( {}, {}, { errorFormatter });


export type RequestScheme = CustomSchema<typeof customValidator>


type ValidationParams = {
  req: Request;
  res: Response;
  next: NextFunction;
  locations: Array<Location>;
  scheme: RequestScheme;
}


export abstract class CustomRequestValidator {

  protected validator = customValidator;

  protected async executeValidation( { req, res, next, locations, scheme }: ValidationParams ){
    try {
      await this.validator.checkSchema( scheme, locations ).run( req );

      const result: Result = this.validator.validationResult( req );
      if ( !result.isEmpty() ) {
        const errors: Array<ValidationError> = result.array();
        throw new ResponseError( 400, errors );
      };

      locations.forEach( location => {
        req[location] = matchedData(req, { locations: [location] });
      });

      return next();

    } catch (error) {
      ResponseError.sendHttpError(res, error);
    }
  }

}
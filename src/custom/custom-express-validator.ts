import { Request, Response, NextFunction } from 'express';
import { ExpressValidator, CustomSchema, Location, Result, ValidationError } from 'express-validator';


const customValidator = new ExpressValidator();


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
      if ( result.isEmpty() ) return next();

      const errors: Array<ValidationError> = result.array();

      console.log(errors);
  
      throw new Error();

    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: 'Invalid data' });
    }
  }

}
import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationChain, body } from 'express-validator';


export class RequestValidator {

    private static async runValidations( req: Request, validations: Array<ValidationChain> ) {
        await Promise.all( validations.map( validation => {
            validation.run( req )
        }));
    }


    private static checkResult( req: Request, res: Response, next: NextFunction ) {

        const result: Result = validationResult( req );
        if ( !result.isEmpty() ) {
            return res.status(400).json({
                ok: false,
                errors: result.mapped()
            });
        }

        return next();
    }

    
    public static async validateLogin( req: Request, res: Response, next: NextFunction ) {

        await RequestValidator.runValidations( req, [
            body( 'email', 'Email is required' ).isEmail(),
            body( 'password', 'Password is required' ).notEmpty()
        ]);

        RequestValidator.checkResult( req, res, next );
    }


    public static async validateRegister( req: Request, res: Response, next: NextFunction ) {
        
        await RequestValidator.runValidations( req, [
            body( 'name', 'Name is required' ).notEmpty(),
            body( 'password', 'Password is required' ).notEmpty(),
            body( 'email', 'Email is required' ).isEmail()
        ]);

        RequestValidator.checkResult( req, res, next );
    }

}

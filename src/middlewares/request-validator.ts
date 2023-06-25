import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationChain, body } from 'express-validator';


export class RequestValidator {

    private async runValidations( req: Request, validations: Array<ValidationChain> ) {
        await Promise.all( validations.map( validation => {
            validation.run( req )
        }));
    }

    private checkResult( req: Request, res: Response, next: NextFunction ) {

        const result: Result = validationResult( req );
        if ( !result.isEmpty() ) {
            return res.status(400).json({
                ok: false,
                errors: result.mapped()
            });
        }

        return next();
    }

    
    public async validateLogin( req: Request, res: Response, next: NextFunction ) {

        await this.runValidations( req, [
            body( 'email', 'Email is required' ).isEmail(),
            body( 'password', 'Password is required' ).notEmpty()
        ]);

        this.checkResult( req, res, next );
    }


    public async validateRegister( req: Request, res: Response, next: NextFunction ) {
        
        await this.runValidations( req, [
            body( 'name', 'Name is required' ).notEmpty(),
            body( 'password', 'Password is required' ).notEmpty(),
            body( 'email', 'Email is required' ).isEmail()
        ]);

        this.checkResult( req, res, next );
    }

}

import { Request, Response } from 'express';


export class AuthController {

    public register( req: Request, res: Response ) {
        res.json({
            ok: true,
            message: 'User registered successfully'
        });
    }

    public login( req: Request, res: Response ) {
        res.json({
            ok: true,
            message: 'User logged successfully'
        });
    }

    public renewAccess( req: Request, res: Response ) {
        res.json({
            ok: true,
            message: 'Access renewed successfully'
        });
    }

}

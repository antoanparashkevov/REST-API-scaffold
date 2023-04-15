import { parseToken } from "../services/authService.js";

export default function() {
    return (req,res,next) => {
        const token = req.headers('x-authorization');
        
        if( token ) {
            try {
                req.user = parseToken(token);
                req.token = token;
            } catch ( error ) {
                //403 - forbidden
                return res.status(403).json({
                    message: 'Invalid authorization token',
                    error
                })
            }
        }
        
        next();
    }
}
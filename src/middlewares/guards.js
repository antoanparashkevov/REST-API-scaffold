export const hasUser = () => {
    
    return (req, res, next) => {
        
        if( req.user && req.user.isConfirmed ) {
            next();
        } else {
            //401 - unauthorized
            res.status(401).json({
                message: 'Please login!'
            })
        }
    }
}

export const isGuest = () => {
    
    return (req, res, next) => {
        
        if( !req.user || req.user && !req.user.isConfirmed ) {
            next();
        } else {
            //400 - bad request
            res.status(400).json({
                message: 'You are already logged in!'
            })
        }
    }
}

export const hasRole = () => {
    
    return (req, res, next) => {
        
        if( req.user.roles.includes('admin') ) {
            next();
        } else {
            res.status(400).json({
                message: 'You don\'t have permission to perform this action!'
            })
        }
    }
}

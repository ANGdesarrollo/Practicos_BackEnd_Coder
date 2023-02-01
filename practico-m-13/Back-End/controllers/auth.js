import { log } from "../utils/logger.js";

export const auth = ( req, res ) => {
    try {
        res.json( {
            status: true,
            message: 'User successfully logged in'
        } )
    } catch( err ) {
        log.info( err )
        res.json( {
            status: false,
            message: 'Server error, please contact support'
        } )
    }
}

export const isAuthenticated = (req, res) => {
    try {
        res.json({
            status: true,
            message: 'User is authenticated'
        })

    }catch(err) {
        log.info(err)
        res.json({
            status: false,
            message: 'Server error, please contact support'
        })
    }
}

export const destroySession = ( req, res ) => {
    try {
        if( req.user ) {
            req.session.destroy( ( err ) => {
                if( err ) {
                    res.json( {
                        status: false,
                        message: 'User log out failed'
                    } )

                } else {
                    res.json( {
                        status: true,
                        message: 'User logged out successfully'
                    } )
                }
            } )
        }

    } catch( err ) {
        log.error( err )
        res.json( {
            status: false,
            message: 'Fatal Error, please contact support'
        } )
    }
};

export const registerUser = ( req, res ) => {
    try {
        res.json( {
            status: true,
            message: 'User successfully registered'
        } )
    } catch( err ) {
        log.error( err );
        res.json( {
            status: false,
            message: 'Server error, please contact support'
        } )
    }
};

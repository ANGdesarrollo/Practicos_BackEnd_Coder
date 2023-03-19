const logger = require( "../utils/winstonLogger/winstonLogger" );
const { authService } = require( "../services/authService" );

class authController {
    constructor() {
        this.authService = new authService();
    }

    auth(req, res) {
        try {
            res.json( {
                status: true,
                message: 'User successfully logged in'
            } )
        } catch ( err ) {
            logger.info( 'error', `${ err }` )
            res.json( {
                status: false,
                message: 'Server error, please contact support'
            } )
        }
    }

    isAuthenticated(req, res) {
        try {
            const user = this.authService.isAuthenticatedService(req);

            res.json( {
                username: user,
                status: true,
                message: 'User is authenticated'
            } )

        } catch ( err ) {
            logger.info( 'error', `${ err }` )
            res.json( {
                status: false,
                message: 'Server error, please contact support'
            } )
        }
    }

    destroySession(req, res) {
        try {
            if ( req.user ) {
                req.session.destroy( ( err ) => {
                    if ( err ) {
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

        } catch ( err ) {
            logger.info( 'error', `${ err }` )
            res.json( {
                status: false,
                message: 'Fatal Error, please contact support'
            } )
        }
    }

    async registerUser(req,res) {
        try {
            await this.authService.registerUserService();
            res.json( {
                status: true,
                message: 'User successfully registered'
            } )
        } catch ( err ) {
            logger.info( 'error', `${ err }` )
            res.json( {
                status: false,
                message: 'Server error, please contact support'
            } )
        }
    }
}


module.exports = {
    authController
}

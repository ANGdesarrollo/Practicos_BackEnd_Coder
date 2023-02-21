const logger = require( "../utils/winstonLogger/winstonLogger" );
const { email } = require( "../utils/nodemailer/nodemailer" );

const auth = ( req, res ) => {
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

const isAuthenticated = ( req, res ) => {
    try {
        const { _id, name, address, phone, avatar, username } = req.user;
        const user = {
            _id,
            name,
            address,
            phone,
            avatar,
            username
        }

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

const destroySession = ( req, res ) => {
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
};


const registerUser = async ( req, res ) => {
    try {
        const data = `<h1>Tienes un nuevo registro de : </h1>
                       <h2>${ req.body.name }</h2> 
                      <h2>${ req.body.address }</h2> 
                      <h2>${ req.body.phoneNumber }</h2> 
                      <h2>${ req.body.username }</h2>
                      <h2>${ req.body.avatar }</h2>`
        console.log(data)
        await email( data );
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
};

module.exports = {
    auth,
    destroySession,
    registerUser,
    isAuthenticated
}

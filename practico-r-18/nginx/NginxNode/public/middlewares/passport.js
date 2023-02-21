const LocalStrategy = require( 'passport-local' ).Strategy;
const User = require( "../models/user" );
const bCrypt = require( "bcrypt" );
const logger = require( "../utils/winstonLogger/winstonLogger" );

const createHash = ( password ) => bCrypt.hashSync( password, bCrypt.genSaltSync( 10 ), null );
const isValidPassword = ( user, password ) => bCrypt.compareSync( password, user.password );

exports.passportLocalLogin = new LocalStrategy( ( username, password, done ) => {
    User.findOne( { username: username }, ( err, user ) => {
        if ( err ) return done( err );
        if ( !user ) return done( null, false );
        if ( !isValidPassword( user, password ) ) return done( null, false );
        return done( null, user );
    } );
} );

exports.passportLocalRegister = new LocalStrategy( {
        passReqToCallback: true,
    },
    ( req, username, password, done, res ) => {
        {User.findOne( { 'username': username }, function
            ( err, user ) {
            const { body } = req;
            if ( err ) {
                logger.info( 'error', `${ err }` )
                return done( err );
            }
            if ( user ) {
                logger.info( 'warn', `User already exists` )

                return done( null, false )
            }
            const newUser = {
                name: body.name,
                address: body.address,
                phone: body.phoneNumber,
                avatar: body.avatar,
                username: username,
                password: createHash( password ),
            }
            console.log(newUser)
            User.create( newUser, ( err, userWithId ) => {
                if ( err ) {
                    logger.info( 'error', `${ err }` )
                    return done( err );
                }
                console.log( user )
                console.log( 'User Registration successful' );
                return done( null, userWithId );
            } );
        } );}
    }
)







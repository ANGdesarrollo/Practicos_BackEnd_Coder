const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");
const bCrypt = require("bcrypt");

const createHash = ( password ) => bCrypt.hashSync( password, bCrypt.genSaltSync( 10 ), null );
const isValidPassword = ( user, password ) => bCrypt.compareSync( password, user.password );

exports.passportLocalLogin = new LocalStrategy( ( username, password, done ) => {
    User.findOne( { username: username }, ( err, user ) => {
        if( err ) return done( err );
        if( !user ) return done( null, false );
        if( !isValidPassword( user, password ) ) return done( null, false );
        return done( null, user );
    } );
} );

exports.passportLocalRegister = new LocalStrategy( {
        passReqToCallback: true,
    },
    ( req, username, password, done, res ) => {
        User.findOne( { 'username': username }, function
            ( err, user ) {
            if( err ) {
                console.log( 'Error in SignUp: ' + err );
                return done( err );
            }
            if( user ) {
                console.log( 'User already exists' );
                return done( null, false )
            }
            const newUser = {
                username: username,
                password: createHash( password ),
            }
            User.create( newUser, ( err, userWithId ) => {
                if( err ) {
                    console.log( 'Error in Saving user: ' +
                        err );
                    return done( err );
                }
                console.log( user )
                console.log( 'User Registration successful' );
                return done( null, userWithId );
            } );
        } );
    }
)







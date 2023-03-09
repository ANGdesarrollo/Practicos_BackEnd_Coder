const express = require('express');
const dotenv = require('dotenv');
const { config } = dotenv;
const http = require('http');
const { sessionMongo } = require("../database/config/configMongo.js");
const { sockets, io } = require("../sockets/socket");
const passport = require('passport');
const User = require("../models/user.js");
const { passportLocalLogin, passportLocalRegister } = require("../middlewares/passport.js");
const minimist = require('minimist');
const { Server } = require( "socket.io" );
const cors = require('cors');
const logger = require( "../utils/winstonLogger/winstonLogger" );
const cookieParser = require('cookie-parser')
config( { path: './enviroment/.env' } );
const UserDaos = require("../daos/userDaos/userDaos")


const corsPolicy = process.env.corsOrigin;

const argv = minimist( process.argv.slice( 2 ), {
    default: {
        mode: 'FORK',
        p: 8080
    }
} );

const PORT = argv.p;
const app = express();
const server = http.createServer( app );

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.use(cookieParser())
app.use( sessionMongo() );
passport.serializeUser( ( user, done ) => done( null, user._id ) );
passport.deserializeUser( ( id, done ) => User.findById( id, done ) );
passport.use( "login", passportLocalLogin );
passport.use( "signup", passportLocalRegister );
app.use(cors({
    origin: corsPolicy,
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use( passport.initialize() );
app.use( passport.session() );

server.listen( PORT, () => {
    logger.log( "info", `Server listening on http://localhost:${ PORT }` )
} );

// Routes
app.use( '/api/test-products', require('../routes/faker'));
app.use( '/api/auth', require('../routes/auth') );
app.use( '/api/info', require('../routes/info') );
app.use( '/api/randoms', require('../routes/randoms') );
app.use('/api/cart', require('../routes/cart'));

// Sockets
const ioSocket = io( Server, server, corsPolicy )
sockets( ioSocket )

app.get( "/", ( req, res ) => {
    res.send( "hola servidor" )
} )
























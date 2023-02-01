import express from 'express';
import { config } from 'dotenv';
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';
import { log } from '../utils/logger.js';
import { routerAuth, routerFaker, routerInfo, routerRandoms } from "../routes/index.js";
import { dbConnectionMongo, sessionMongo } from "../database/config.js";
import { corsConfig, sockets } from "../sockets/index.js";
import passport from 'passport';
import User from "../models/user.js";
import { passportLocalLogin, passportLocalRegister } from "../middlewares/passport.js";
import minimist from 'minimist';

config( { path: './enviroment/.env' } );

await dbConnectionMongo()

const app = express();
const corsPolicy = process.env.corsOrigin;
const server = http.createServer( app );
const argv = minimist(process.argv.slice(2));
const PORT = argv.p;

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.use( sessionMongo() );
passport.serializeUser( ( user, done ) => done( null, user._id ) );
passport.deserializeUser( ( id, done ) => User.findById( id, done ) );
passport.use( "login", passportLocalLogin );
passport.use( "signup", passportLocalRegister );


app.use( passport.initialize() );
app.use( passport.session() );

server.listen( PORT, () => {
    log.info( `Server listening on http://localhost:${ PORT }` )
} );

app.use( cors( {
    origin: corsPolicy,
    methods: [ "GET", "POST" ],
    credentials: true
} ) )

// Routes
app.use( '/api/test-products', routerFaker );
app.use( '/api/auth', routerAuth );
app.use('/api/info', routerInfo);
app.use('/api/randoms', routerRandoms)

// Sockets
export const io = new Server( server, { cors: corsConfig( corsPolicy ) },
    log.info( 'Socket IO Online' ) );

sockets( io );



















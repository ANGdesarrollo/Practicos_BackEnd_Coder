const session = require( "express-session" );
const MongoStore = require( "connect-mongo" );
const mongoose = require( "mongoose" );
const logger = require( "../../utils/winstonLogger/winstonLogger" );
const connect = mongoose.connect;

mongoose.set( 'strictQuery', true )

exports.mongoDB =  class Database {
    static instance = null;
    constructor() {
        try {
            if(process.env.DB === 'mongo') {
                connect( process.env.DB_CNN_MONGO, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                } )
                logger.log( 'info', "MongoServer online" )
            }
        } catch ( err ) {
            logger.info( 'error', `${ err }` )
            throw new Error( 'Error to initialize MongoDB' );
        }
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

exports.sessionMongo = () => {
    try {
        const sessionCookies = session( {
            store: new MongoStore( {
                mongoUrl: process.env.DB_CNN_MONGO,
                mongoOptions: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            } ),
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 60 * 10000
            }
        } )
        logger.log( 'info', "Session Mongo online" )
        return sessionCookies
    } catch ( err ) {
        logger.info( 'error', `${ err }` )
    }
}

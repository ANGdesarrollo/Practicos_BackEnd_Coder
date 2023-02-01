const session = require("express-session");
const MongoStore = require("connect-mongo");
const log = require("../utils/logger").log;
const mongoose = require("mongoose");
const connect = mongoose.connect;

mongoose.set('strictQuery', true)

exports.dbConnectionMongo = async() => {
    try {
        await connect(process.env.DB_CNN_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        log.info('Mongo DB online')
    } catch(err) {
        log.info(err)
        throw new Error('Error to initialize MongoDB');
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
        log.info( 'MongoDB session Online' );
        return sessionCookies
    } catch( err ) {
        log.error( err );
    }
}

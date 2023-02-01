import session from "express-session";
import MongoStore from "connect-mongo";
import { log } from "../utils/logger.js";
import mongoose, { connect } from "mongoose";

mongoose.set('strictQuery', true)

export const dbConnectionMongo = async() => {
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

export const sessionMongo = () => {
    try {
        const sessionCookies = session( {
            store: MongoStore.create( {
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





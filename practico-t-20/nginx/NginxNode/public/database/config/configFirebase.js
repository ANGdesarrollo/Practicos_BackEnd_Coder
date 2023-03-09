const admin = require( 'firebase-admin' );
const { certFirebase } = require( "./certFirebase" );
const { config } = require( "dotenv" );
const { getFirestore } = require( "firebase-admin/firestore" );
const logger = require( "../../utils/winstonLogger/winstonLogger" );

config( { path: './environment/.env' } );

const firebaseDB = class Database {
    static instance = null;

    constructor() {
        try {
            if(process.env.DB === 'firebase') {
                admin.initializeApp( {
                    credential: admin.credential.cert( certFirebase )
                } );
                logger.info('Firebase Online')
                return getFirestore();
            }

        } catch ( err ) {
            throw new Error( 'Error to initialize Firebase' );
        }
    }

    static getInstance() {
        if ( !Database.instance ) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

module.exports = firebaseDB;

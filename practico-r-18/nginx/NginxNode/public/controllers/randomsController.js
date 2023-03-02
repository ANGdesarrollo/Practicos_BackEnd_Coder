const logger = require( "../utils/winstonLogger/winstonLogger" );
const { calculateRandomsService } = require( "../services/randomsService" );

const calculateRandoms = ( req, res ) => {
    try {
        const numbers = calculateRandomsService(req)
        res.json({
            numbers
        })


    } catch( err ) {
        logger.info('error', `${err}`)
    }
}

module.exports = calculateRandoms;






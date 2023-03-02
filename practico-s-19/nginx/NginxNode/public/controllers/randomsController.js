const logger = require( "../utils/winstonLogger/winstonLogger" );
const { calculateRandomsService } = require( "../services/randomsService" );

const calculateRandoms = async( req, res ) => {
    try {
        console.log('entre')
        const numbers = await calculateRandomsService(req)
        console.log(numbers)
        res.json({
            numbers
        })


    } catch( err ) {
        logger.info('error', `${err}`)
    }
}

module.exports = calculateRandoms;






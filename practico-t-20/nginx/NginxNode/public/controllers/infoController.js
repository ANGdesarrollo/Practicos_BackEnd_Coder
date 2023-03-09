const logger = require( "../utils/winstonLogger/winstonLogger" );
const { getInfoService } = require( "../services/infoService" );



const getInfo = async(req, res) => {
    try{

        const data = getInfoService()
        logger.info('info', 'Data sent')

        res.json({
            status: true,
            data
        })

    } catch(err){
        logger.info( 'error', `${ err }` )
    }
}

module.exports = getInfo;


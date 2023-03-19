const logger = require( "../utils/winstonLogger/winstonLogger" );
const { InfoService } = require( "../services/infoService" );

class InfoController {
    constructor() {
        this.infoService = new InfoService();
    }

    async getInfo(req, res) {
        try{
            const data = this.infoService.getInfoService()
            logger.info('info', 'Data sent')
            res.json({
                status: true,
                data
            })

        } catch(err){
            logger.info( 'error', `${ err }` )
        }
    }
}

module.exports = InfoController;


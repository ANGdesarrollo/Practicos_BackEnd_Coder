const logger = require( "../utils/winstonLogger/winstonLogger" );
const { RandomService } = require( "../services/randomsService" );

class RandomsController {
    constructor() {
        this.randomService = new RandomService();
    }

    async calculateRandoms(req, res) {
        try {
            console.log('entre')
            const numbers = await this.randomService.calculateRandomService(req)
            console.log(numbers)
            res.json({
                numbers
            })


        } catch( err ) {
            logger.info('error', `${err}`)
        }
    }
}


module.exports = RandomsController;






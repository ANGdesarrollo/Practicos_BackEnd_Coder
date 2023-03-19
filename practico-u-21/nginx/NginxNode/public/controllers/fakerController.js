const logger = require( "../utils/winstonLogger/winstonLogger" );
const { FakerService } = require( "../services/fakerService" );

class FakerController {
    constructor() {
        this.fakerService = new FakerService();
    }

    fakerProducts(req, res) {
        try {
            const products = this.fakerService.fakerProductsService();

            res.json( {
                status: true,
                message: 'Faker JS products created successfully',
                products: products
            } )

        } catch( err ) {
            logger.info( 'error', `${ err }` )
            res.json( {
                status: false,
                message: 'Products cant be created'
            } )
        }
    }
}

module.exports = {
    FakerController
}


const logger = require( "../utils/winstonLogger/winstonLogger" );
const { fakerProductsService } = require( "../services/fakerService" );

exports.fakerProducts = ( req, res ) => {
    try {
       const products = fakerProductsService();

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

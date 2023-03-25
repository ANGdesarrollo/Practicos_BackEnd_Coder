const logger = require( "../utils/winstonLogger/winstonLogger" );
const { ProductService } = require( "../services/productService" );

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async saveProduct( req, res ) {
        try {
            await new ProductService().saveProductService( req.body )
            res.status(201).json( {
                status: true,
                message: "Product successfully saved",
            } );
        } catch ( err ) {
            logger.error( err, `${ err }` );
        }
    }

    async getAllProducts( req, res ) {
        try {
            const products = await new ProductService().getAllProductsService()
            res.json( {
                status: true,
                data: products,
            } );
        } catch ( err ) {
            logger.error( err, `${ err }` );
        }
    }
}

module.exports = {
    ProductController,
};

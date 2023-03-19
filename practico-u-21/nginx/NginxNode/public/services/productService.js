const ProductDaos = require( '../daos/productsDaos/productDaos' );
const dayjs = require( "dayjs" );


class ProductService {
    constructor() {
        this.database = ProductDaos;
    }

    async saveProductService( product ) {
        try {
            if ( product.name && product.price && product.thumbnail ) {
                const dateNow = dayjs().format( 'YYYY/MM/DD hh:mm:ss' );
                const finalProduct = { ...product, timestamp: dateNow };
                await this.database.create( finalProduct );
            }
        } catch ( err ) {
            console.log( err );
        }
    }

    async getAllProductsService() {
        try {
            return await this.database.getAll()
        }catch(err) {
            console.log(err)
        }
    }
}

module.exports = {
    ProductService
}

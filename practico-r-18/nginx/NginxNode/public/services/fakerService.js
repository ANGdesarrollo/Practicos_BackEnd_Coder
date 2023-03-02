const fakerController = require( "faker" );

const fakerProductsService = () => {
    const products = [];

    for( let i = 0; i < 5; i++ ) {
        const { commerce, image } = fakerController
        const product = {
            product: commerce.product(),
            price: commerce.price(),
            thumbnail: image.cats( 190, 190, true )
        }
        products.push( product );
    }

    return products;
}

module.exports = {
    fakerProductsService
}

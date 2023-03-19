const logger = require( "../utils/winstonLogger/winstonLogger" );
const { CartService } = require( "../services/cartService" );

class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    async saveOrder(req, res)  {
        try {
            const cart = await this.cartService.saveOrderService()
            res.json( {
                status: true,
                message: 'Order successfully received',
                order: cart
            } )
        } catch ( err ) {
            logger.info( 'error', `${ err }` )
            res.json( {
                status: false,
                message: 'Internal Server Error, please contact support'
            } )
        }
    }

}


module.exports = {
    CartController
}

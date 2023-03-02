const logger = require( "../utils/winstonLogger/winstonLogger" );
const { saveOrderService } = require( "../services/cartService" );

const saveOrder = async ( req, res ) => {
    try {
        const cart = await saveOrderService()
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

module.exports = {
    saveOrder
}

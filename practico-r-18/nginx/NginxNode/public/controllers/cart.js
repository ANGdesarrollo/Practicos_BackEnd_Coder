const logger = require( "../utils/winstonLogger/winstonLogger" );

const saveOrder = ( req, res ) => {
    try {
        const { body } = req;
        const { cart } = body.CartToSend



    } catch ( err ) {
        logger.info( 'error', `${ err }` )
    }
}

module.exports = {
    saveOrder
}

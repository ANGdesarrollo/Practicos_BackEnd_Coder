const logger = require( "../utils/winstonLogger/winstonLogger" );
const { email } = require( "../utils/nodemailer/nodemailer" );
const { twilioWA } = require( "../utils/twilio/twilioWA" );
const { TwilioMsg } = require( "../utils/twilio/twilioMsg" );

const saveOrder = async ( req, res ) => {
    try {
        const { body } = req;
        const { cart, user } = body.CartToSend;
        const data = `<h1>You have a new order from ${user}</h1><h2>${ JSON.stringify( cart, null, 2 ) }</h2>`
        const test = JSON.stringify( cart, null, 2 )
        await email( data, 'New Order' );
        await twilioWA( `You have a new order from ${user}, ${test}`  );
        await TwilioMsg('Your order has been received and is being processed.')

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

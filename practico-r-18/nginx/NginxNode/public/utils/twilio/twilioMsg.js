const dotenv = require( "dotenv" );
const { config } = dotenv;
config( { path: './enviroment/.env' } );
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;
const client = require( 'twilio' )( accountSid, authToken );

const TwilioMsg = async ( body ) => {
    await client.messages
        .create( {
            body: body,
            from: '+12705143682',
            to: '+542915343707'
        } );
}


module.exports = {
    TwilioMsg
}

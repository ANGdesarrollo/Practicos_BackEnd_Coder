const accountSid = 'ACae3632cc1216f8979598eacf8bedbdb0';
const authToken = '6639af4fb642f347998b2d36c610f88c';
const client = require( 'twilio' )( accountSid, authToken );


const TwilioMsg = ( body ) => {
    client.messages
        .create( {
            body: body,
            from: '+12705143682',
            to: '+542915343707'
        } )
        .then( message => console.log( message.sid ) )
}

module.exports = {
    Twilio: TwilioMsg
}

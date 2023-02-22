const accountSid = 'ACae3632cc1216f8979598eacf8bedbdb0';
const authToken = '888e81cb0300cc432b70c67aa8032dce';
const client = require( 'twilio' )( accountSid, authToken );

const twilioWA = ( body ) => {
    client.messages
        .create({
            body: body,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5492915343707'
        })
        .then(message => console.log(message.sid))

}

module.exports = {
    twilioWA
}


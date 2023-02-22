const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;
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


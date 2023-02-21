"use strict";
const nodemailer = require( "nodemailer" );
const emailOwner = 'alexisgraff123@gmail.com'

const email = async ( body ) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport( {
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: 'alexisgraff123@gmail.com',
            pass: 'aekjndygsrlagrhz',
        },
    } );

    let info = await transporter.sendMail( {
        from: '"Alexis Graff 👻" <foo@example.com>', // sender address
        to: emailOwner, // list of receivers
        subject: "New Register ✔", // Subject line
        text: 'New user registered', // plain text body
        html: `${ body }`, // html body
    } );

    console.log( "Message sent: %s", info.messageId );
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log( "Preview URL: %s", nodemailer.getTestMessageUrl( info ) );
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
    email
}

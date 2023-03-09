"use strict";
const nodemailer = require( "nodemailer" );
const logger = require( "../winstonLogger/winstonLogger" );
const emailOwner = 'alexisgraff123@gmail.com'

const email = async ( body, subject ) => {
    let transporter = nodemailer.createTransport( {
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: emailOwner,
            pass: process.env.PASS_NODEMAILER,
        },
    } );

    let info = await transporter.sendMail( {
        from: '"Alexis Graff 👻" <foo@example.com>', // sender address
        to: emailOwner, // list of receivers
        subject: `${ subject } ✔`, // Subject line
        text: 'New user registered', // plain text body
        html: `${ body }`, // html body
    } );
    logger.info(`Message sent: %s ${info.messageId}` )
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


module.exports = {
    email
}

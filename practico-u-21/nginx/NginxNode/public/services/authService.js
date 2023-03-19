const { email } = require( "../utils/nodemailer/nodemailer" );


class authService {

    isAuthenticatedService(req) {
        if ( req.user ) {
            const { _id, name, address, phone, avatar, username } = req.user;
            return {
                _id,
                name,
                address,
                phone,
                avatar,
                username
            }
        }
    }

    async registerUserService(req) {
        if(req.body) {
            const data = `<h1>Tienes un nuevo registro de : </h1>
                       <h2>${ req.body.name }</h2> 
                      <h2>${ req.body.address }</h2> 
                      <h2>${ req.body.phoneNumber }</h2> 
                      <h2>${ req.body.username }</h2>
                      <h2>${ req.body.avatar }</h2>`
            await email( data, 'New Register' );
        }
    }
}

module.exports = {
    authService
}

const CrudServiceFirebase = require( "../../container/firebaseContainer" );
const UserModel = require( "../../models/user" );
const CrudServiceMongo = require( "../../container/mongoContainer" );

let User;
let mode = process.env.DB

if ( mode === 'mongo' ) {
    console.log("Soy factory y me llamaron desde mongo")
    class UserDaosModel extends CrudServiceMongo {
        constructor() {
            super( UserModel );
        }
    }
    User = new UserDaosModel();
}

if ( mode === 'firebase' ) {
    console.log("Soy factory y me llamaron desde firebase")
    class UserDaosModel extends CrudServiceFirebase {
        constructor() {
            super( UserModel );
        }
    }
    User = new UserDaosModel();
}

if (!mode) {
    throw new Error('No database Selected')
}

module.exports = User;


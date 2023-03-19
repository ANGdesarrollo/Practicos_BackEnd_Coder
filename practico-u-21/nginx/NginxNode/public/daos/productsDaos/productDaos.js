const CrudServiceFirebase = require( "../../container/firebaseContainer" );
const ProductModel = require( "../../models/product" );
const CrudServiceMongo = require( "../../container/mongoContainer" );

let ProductDaos;
let mode = process.env.DB

if ( mode === 'mongo' ) {
    class UserDaosModel extends CrudServiceMongo {
        constructor() {
            super( ProductModel );
        }
    }
    ProductDaos = new UserDaosModel();
}

if ( mode === 'firebase' ) {
    console.log("Soy factory y me llamaron desde firebase")
    class UserDaosModel extends CrudServiceFirebase {
        constructor() {
            super( ProductModel );
        }
    }
    ProductDaos = new UserDaosModel();
}

if (!mode) {
    throw new Error('No database Selected')
}

module.exports = ProductDaos;

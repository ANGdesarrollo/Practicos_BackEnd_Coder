const { Schema, model } = require( "mongoose" );

const schemaProduct = new Schema( {
    name: { type: String, required: true },
    date: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: String , required: true }
})

module.exports = model( 'product', schemaProduct );



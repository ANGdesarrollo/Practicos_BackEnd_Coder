const { Schema, model } = require("mongoose");

const schemaCart = new Schema({
    username: { type: String, required: true },
    cart: []
})

module.exports = model('cart', schemaCart);

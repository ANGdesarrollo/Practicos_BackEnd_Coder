const { Schema, model } = require("mongoose");

const schemaUser = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: Number, required: true },
    avatar: { type: String , required: true},
    username: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 50}
})

module.exports = model('user', schemaUser);

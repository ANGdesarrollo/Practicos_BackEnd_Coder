import { Schema, model } from "mongoose";

const schemaUser = new Schema({
    username: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 50}
})

export default model('user', schemaUser);

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    jobTitle: {
        type: String
    }
});
// Mongoose model
const User = mongoose.model("nodestore", UserSchema);

 module.exports=User;
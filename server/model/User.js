const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email :  {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});


module.exports =  mongoose.model("TestUsers", userSchema);
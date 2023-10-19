const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    desc :  {
        type: String,
        required: true,
    },
    img :  {
        type: String,
        required: true,
    },
    user : {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now, 
    },
})

module.exports =  mongoose.model("Blog", blogSchema);
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/BlogApp").then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log("Error on while connecting database");
})
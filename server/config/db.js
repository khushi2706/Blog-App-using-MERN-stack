const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BlogApp").then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log("error");
})
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


mongoose.connect("Enter you MongoDb Uri Here").then(()=>{
    console.log("DataBase Is connected Now Let's Store Some Data..!");
}).catch((err)=>{
    console.log(err);
})
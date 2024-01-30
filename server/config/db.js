const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


mongoose.connect("mongodb+srv://raymondyounes:cu4yLypyIbmMfL7K@younes-dev.enszkpk.mongodb.net/test").then(()=>{
    console.log("DataBase Is connected Now Let's Store Some Data..!");
}).catch((err)=>{
    console.log(err);
})
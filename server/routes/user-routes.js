const express = require("express");
const {  getAllUser , signUp ,logIn } = require("../controller/user-contoller");
const userRouter = express.Router();

userRouter.get("/khushi",(req,res)=>{
    res.send(" you are awesome can we collaborative for mernstack project i have yotube channel called simplyjs you can checkout and try to work together");
})
userRouter.get("/",getAllUser);
userRouter.post("/signup", signUp);
userRouter.post("/login" , logIn);

module.exports =  userRouter;
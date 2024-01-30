// user-routes.js
const express = require("express");
const { getAllUser, signUp, singIn } = require("../controller/user-contoller");
const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signUp);
userRouter.post("/signin", singIn);

module.exports = userRouter;

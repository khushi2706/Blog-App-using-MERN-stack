const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
require("./config/db");
const cors = require("cors");

const app = express();
const path = require('path')


app.use(cors());

// defined  path for serving the upload folder
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});

//define port

app.listen(5001, () => console.log("app started at 5001..."));

const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const connectToDb = require("./db/index.js");
const cors = require("cors");
const PORT = 5000;
const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});

//define port

// app.listen(5000, () => console.log("app started at 5000..."));

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));
  })
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit(1);
  });

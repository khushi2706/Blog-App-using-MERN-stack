const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const helmet = require("helmet");
require("./config/db");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

//setting helmet middleware
app.use(helmet(
  {
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }
));

app.set("view engine", "ejs");
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => console.log(`app started at ${PORT}...`));

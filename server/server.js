const express = require('express');
const path = require('path');
const app = express();
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const bodyParser = require('body-parser');

require("./config/db");
const cors = require('cors');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle all other routes by returning the React app's HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Define API routes
app.use("/api/v1", userRouter);
app.use("/api/v1", blogRouter);

// Define port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const mongoose = require("mongoose");

const connectToDb = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    `mongodb+srv://${process.env.atlasUserName}:${process.env.atlasPassword}@khushi-blog-app.6h5resz.mongodb.net/?retryWrites=true&w=majority&appName=khushi-blog-app`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("database connected");
};

module.exports = connectToDb;

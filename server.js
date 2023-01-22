const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;
const HOST_URI = process.env.HOST_URI;

const connection = mongoose.connect(HOST_URI, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful.\nServer running. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });

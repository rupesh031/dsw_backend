const express = require("express");
const app = express();
const res = require("express/lib/response");
const session = require("express-session");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
console.log("hello");

const mongo = require("mongoose");
mongo.connect(process.env.DATABASE_URL, { usenewUrlParser: true });
const db = mongo.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connection complete");
});


// app.use(
//   urlencoded({
//     extended: true,
//   })
// );


app.get("/", (req, res) => {
  res.send("heyy u logged in");
  res.end();
});
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`app is listening at ${port}`)
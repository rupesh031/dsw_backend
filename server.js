const express = require("express");
const app = express();
const res = require("express/lib/response");
const session = require("express-session");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const signup = require("./routes/signup");
const login = require("./routes/login");
const event = require("./routes/event");
const cookieSession = require("cookie-session");

const mongo = require("mongoose");
const { secret } = require("./config/auth.config");
mongo.connect(process.env.DATABASE_URL, { usenewUrlParser: true });
const db = mongo.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Mongodb connection complete");
});
app.use(express.static(__dirname + "public")); //Serves resources from public folder
app.use("/images", express.static(__dirname + "/public/EventCovers"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "dsw-session",
    secret: secret, // should use as secret environment variable
    httpOnly: true,
  })
);

const port = process.env.PORT || 3000;
app.use("/signup", signup);
app.use("/login", login);
app.use("/event", event);

app.listen(port);
console.log(`app is listening at ${port}`);

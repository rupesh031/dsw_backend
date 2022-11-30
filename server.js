const express = require("express");
const res = require("express/lib/response");
const session = require("express-session");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const mongoose = require("mongoose");
const imageRoutes =require('./routes/lost_imgRoutes');

console.log("hello");
const app = express();

app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DATABASE_URL,
    { usenewUrlParser: true,useUnifiedTopology:true })
    .then(() => {
     console.log('You are connected to dsw')
     // app.listen(3000);
 })
 .catch((error) => {
     console.log('Connection to dsw failed', error)
 });
 app.use(express.static(__dirname + "public")); //Serves resources from public folder
app.use("/images", express.static(__dirname + "/public/FoundImage"));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
app.use('/api/post', imageRoutes );
app.get("/", (req, res) => { res.send("working") });

// const db = mongo.connection;
// client.db("DSW").collection("images");
// db.on("error", (error) => {
//   console.error(error);
// });
// db.once("open", () => {
//   console.log("connection complete");
// });




const port = process.env.PORT || 3000;
app.listen(port);
console.log(`app is listening at ${port}`)
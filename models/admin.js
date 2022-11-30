const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");
var crypto = require("crypto");
const validator = require("validator");

const AdminSchema = new mongo.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  type: {
    type: String,
    required: true,
  },
  club: {
    type: String,
  },
});
const Admin = mongoose.model("Admins", AdminSchema);
module.exports = Admin;

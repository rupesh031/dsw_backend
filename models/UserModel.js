const { Int32 } = require("mongodb");
const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");
var crypto = require("crypto");
const validator = require("validator");

const UsersSchema = new mongo.Schema({
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
  //   phone: {
  //     type: String,
  //     required: true,
  //   },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  //   passwordconfirm: {
  //     type: String,
  //     required: true,
  //   },
  type: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", UsersSchema);
module.exports = User;

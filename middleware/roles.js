const Admin = require("../models/admin");
const User = require("../models/UserModel");

const role = async (email) => {
  console.log("User Type");
  let userType = null;

  await Admin.find({ email: email })
    .exec()
    .then((admin) => {
      if (admin.length >= 1) {
        console.log(admin[0].type);
        userType = admin[0].type;
      }
    });

  console.log("userLog");
  if (userType == null) {
    await User.findOne({ email: email })
      .exec()
      .then((user) => {
        if (user) {
          console.log(user);
          userType = user.type;
        } else {
          userType = null;
        }
      });
  }
  console.log(userType);
  return userType;
};

module.exports = role;

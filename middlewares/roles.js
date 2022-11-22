const Admin = require("../models/admin");
const User = require("../models/UserModel");

const role = async (req, res, next) => {
  console.log("User Type");
  let userType = null;

  await Admin.find({ email: req.body.email })
    .exec()
    .then((admin) => {
      if (admin.length >= 1) {
        console.log(admin[0].type);
        userType = admin[0].type;
      } else {
        User.find({ email: req.body.email })
          .exec()
          .then((user) => {
            if (user.length >= 1) {
              userType = user[0].type;
            } else {
              userType = null;
            }
          });
      }
    });
  console.log(userType);
  return userType;

  //   Admin.findOne({
  //     email: req.body.email,
  //   })
  //     .exec((err, user) => {
  //       if (err) {
  //         console.log("error");
  //         return "error";
  //       }
  //       if (user) {
  //         console.log("admin found");
  //         console.log(user.type);
  //         userType = user.type;
  //       }
  //     })
  //     .then(
  //       User.findOne({
  //         email: req.body.email,
  //       }).exec((err, user) => {
  //         if (err) {
  //         }
  //         if (user) {
  //           userType = "Student";
  //         }
  //         console.log(userType);
  //         return userType;
  //       })
  //     );
};

module.exports = role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config/auth.config");

const Admin = require("../models/admin");

const admin_signin = (req, res, next) => {
  console.log(req.body.email);
  Admin.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({ error: "Invalid Password!" });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        req.session.token = token;

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          type: user.type,
          club: user.club,
        });
      } else {
        return res.status(404).send({ error: "User Not found." });
      }
    });
};

module.exports = admin_signin;

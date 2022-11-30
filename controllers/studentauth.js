var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config/auth.config");
const User = require("../models/UserModel");

const user_signin = (req, res) => {
  User.findOne({ email: req.body.email })
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
          expiresIn: 86400,
        });

        req.session.token = token;

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          type: user.type,
        });
      } else {
        return res.status(404).send({ error: "User Not found." });
      }
    });
};

module.exports = user_signin;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin");
const User = require("../models/UserModel");

router.post("/", (req, res, next) => {
  console.log("Signup Request");
  console.log(req.body);
  if (req.body.userType != "Student") {
    admin_signup(req, res, next);
  } else {
    user_signup(req, res, next);
  }
});

const user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          error: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 5, (err, hash) => {
          if (err) {
            console.log("bycrypt error");
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username: req.body.username,
              type: req.body.userType,
              club: req.body.club,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

const admin_signup = (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then((admin) => {
      if (admin.length >= 1) {
        return res.status(409).json({
          error: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 5, (err, hash) => {
          if (err) {
            console.log("bycrypt error");
            return res.status(500).json({
              error: err,
            });
          } else {
            const admin = new Admin({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username: req.body.username,
              type: req.body.userType,
              club: req.body.club,
            });
            admin
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Admin created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

module.exports = router;

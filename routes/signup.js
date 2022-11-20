const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin");

router.post("/", (req, res, next) => {
  console.log("Signup Request");
  console.log(req.body);
  Admin.find({ email: req.body.email })
    .exec()
    .then((admin) => {
      if (admin.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
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
});

module.exports = router;
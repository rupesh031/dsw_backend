const express = require("express");
const role = require("../middlewares/roles");
const Admin = require("../models/admin");
const router = express.Router();
const User = require("../models/UserModel");

router.get("/all", async (req, res, next) => {
  console.log("get all students request");
  let data = {};
  try {
    User.find({})
      .exec()
      .then((users) => {
        Admin.find({
          $or: [{ type: "General Secretary" }, { type: "Cooridnator" }],
        })
          .exec()
          .then((admins) => {
            admins.forEach((element) => {
              console.log("students");
              if (data[element.club] == null) {
                data[element.club] = { gs: {}, coor: {}, members: [] };
              }
              if (element.type == "General Secretary")
                data[element.club]["gs"] = element;
              else data[element.club]["coor"] = element;
            });

            users.forEach((element) => {
              if (data[element.club] == null) {
                data[element.club] = { gs: {}, coor: {}, members: [] };
              }

              data[element.club]["members"].push(element);
            });
            console.log(data);
            res.status(200).send(data);
          });
      });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "No Members" });
  }

  //res.status(200).send({ message: "ALL STUDENTS AND CLUBS" });
});

router.get("/club/:id", async (req, res, next) => {
  let data = [];
  const club = req.params.id;
  console.log(`get ${req.params.id} students request`);
  try {
    User.find({ club: req.params.id })
      .exec()
      .then((users) => {
        Admin.findOne({ club: club, type: "General Secretary" })
          .exec()
          .then((admin) => {
            data = { gs: admin, members: users };
            console.log(data);
            res.status(200).send(data);
          });
      });
  } catch {
    res.send(500).json({ error: "No Events" });
  }
});

module.exports = router;

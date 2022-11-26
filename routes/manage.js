const express = require("express");
const role = require("../middlewares/roles");
const router = express.Router();
const admin_signin = require("../controllers/admin_auth");
const user_signin = require("../controllers/studentauth");

router.get("/all", async (req, res, next) => {
  console.log("get all students request");

  res.status(200).send({ message: "ALL STUDENTS AND CLUBS" });
});

router.get("/club/:id", async (req, res, next) => {
  console.log(`get ${req.params.id} students request`);

  res.status(200).send({ message: "club STUDENTS AND CLUBS" });
});

module.exports = router;

const express = require("express");
const role = require("../middlewares/roles");
const router = express.Router();
const admin_signin = require("../controllers/admin_auth");
const user_signin = require("../controllers/studentauth");

router.post("/", async (req, res, next) => {
  console.log("SignIn request");
  const type = await role(req.body.email);
  console.log(type);
  if (type != null) {
    if (type != "Student") {
      admin_signin(req, res, next);
    } else {
      user_signin(req, res, next);
    }
  } else {
    res.status(500).send({ error: "User Not Found!" });
    return;
  }
});

module.exports = router;

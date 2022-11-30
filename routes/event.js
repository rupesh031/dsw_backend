const express = require("express");
const role = require("../middleware/roles");

const Event = require("../models/event");
const path = require("path");
const uploadPath = path.join("public", Event.CoverPath);
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const { query } = require("express");
const router = express.Router();

const storageEngine = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const upload = multer({
  storage: storageEngine,
});

router.post("/post", upload.single("cover"), async (req, res, next) => {
  const type = await role(req.body.by);
  console.log("post request");
  console.log(type);
  console.log(req.body);
  const filename = req.file != null ? req.file.filename : null;
  console.log(req.file);
  if (type != null) {
    if (type == "Coordinator" || type == "General Secratary") {
      const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        by: req.body.by,
        eventname: req.body.eventname,
        date: req.body.date,
        venue: req.body.venue,
        club: req.body.club,
        cover: filename,
        desc: req.body.desc,
      });
      event
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: "Event Posted",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    } else {
      res.status(500).json({
        error: "Access Denied",
      });
    }
  } else {
  }
});

router.post("/cover", upload.single("cover"), async (req, res, next) => {
  console.log("upload request");
  const filename = req.file != null ? req.file.filename : null;
  console.log(filename);
});

router.get("/all", async (req, res, next) => {
  console.log("Get events");

  await Event.find({})
    .exec()
    .then((events) => {
      if (events) {
        // console.log(events);
        res.status(200).send(events);
      } else {
        res.send(500).json({ error: "No Events" });
      }
    });
  //   console.log(data);
  //   res.status(500).json({
  //     message: "reached",
  //   });
  //   res.status(200).send(data);
});
router.get("/club/:id", async (req, res, next) => {
  console.log("Get events");
  console.log(req.params.id);

  await Event.find({ club: req.params.id })
    .exec()
    .then((events) => {
      if (events) {
        res.status(200).send(events);
      } else {
        res.send(500).json({ error: "No Events" });
      }
    });
});

router.post("/update", async (req, res, next) => {
  console.log("update events");
});

router.post("/delete", async (req, res, next) => {
  console.log("Get events");
});
module.exports = router;

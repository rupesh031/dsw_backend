const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");
const path = require("path");

const CoverPath = "EventCovers";

const EventSchema = new mongo.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  eventname: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  // time: {
  //   type: String,
  //   required: true,
  // },
  club: {
    type: String,
    required: true,
  },
  by: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

EventSchema.virtual("coverPath").get(function () {
  return path.join("/", CoverPath, this.cover);
});

const Events = mongoose.model("Events", EventSchema);
module.exports = Events;
module.exports.CoverPath = CoverPath;

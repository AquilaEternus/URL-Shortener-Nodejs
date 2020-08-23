const mongoose = require("mongoose");

const shorturlSchema = new mongoose.Schema(
  {
    url: String,
    shortenedURL: String,
  },
  { timestamps: true }
);

const ShortURL = mongoose.model("ShortURL", shorturlSchema);

module.exports = ShortURL;

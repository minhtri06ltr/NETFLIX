const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    desc: { type: String, trim: true },
    img: { type: String, required: true, trim: true },
    imgTitle: { type: String, trim: true },
    trailer: { type: String, trim: true },
    thumbnail: { type: String, trim: true },
    video: { type: String, trim: true },
    year: { type: String, trim: true },
    limit: { type: Number, trim: true },
    duration: { type: String, trim: true },
    genre: { type: String, trim: true },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);

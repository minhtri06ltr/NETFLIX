const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    desc: { type: String, trim: true },
    img: { type: String, required: true, trim: true },
    imgTitle: {
      type: String,
      trim: true,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/9/95/Hololive_Production.png",
    },
    trailer: {
      type: String,
      trim: true,
      default:
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
    },
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

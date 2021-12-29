const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    type: { type: String, trim: true },
    genre: { type: String, trim: true },
    isSeries: { type: Boolean, default: false },
    content: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);

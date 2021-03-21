//SAMPLE MODEL
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GPDSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    sbu_id: { type: Number, required: true },
    department: { type: String, required: true },
    page_setting: { type: String, required: true }, //TODO
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("GPD", GPDSchema);

module.exports = Exercise;

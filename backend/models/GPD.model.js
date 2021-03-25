//SAMPLE MODEL
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GPDSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sbuID: { type: Number, required: true },
    department: { type: String, required: true },
    pageSetting: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("GPD", GPDSchema);

module.exports = Exercise;

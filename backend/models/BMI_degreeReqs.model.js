const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// -1 : course is repeatable for credit
// -2 : course must be taken every semester
// -3 : course can be repeated 1 time for credit

const BmiDegreeSchema = new Schema(
  {
    department: {
      type: String,
      required: true,
      trim: true,
    },
    gpaReq: { type: Number, required: true },
    reqVersionSem: { type: String, required: true },
    reqVersionYear: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    tracks: { type: Map, required: true },
  },
  {
    timestamps: true,
  }
);

const BmiDegreeReqs = mongoose.model("BMI", BmiDegreeSchema);

module.exports = BmiDegreeReqs;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    requiredCourseReqs: { type: Map, required: true },
    electiveCourseReqs: { type: Map, required: true },
    timeLimit: { type: Number, required: true },
    tracks: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const BmiDegreeReqs = mongoose.model("BmiDegreeReqs", BmiDegreeSchema);

module.exports = BmiDegreeReqs;
// module.exports.degreeSchema = degreeSchema;

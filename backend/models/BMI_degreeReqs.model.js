const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BmiDegreeSchema = new Schema(
  {
    department: {
      type: String,
      required: true,
      trim: true,
    },
    gpaReq: { type: Number, required: true }, // 3.0
    specialization: { type: String, required: true }, // II, CI, or TBI
    track: { type: String, required: true }, // Thesis or Project
    reqVersionSem: { type: String, required: true }, // Spring
    reqVersionYear: { type: String, required: true }, // 2021
    requiredCourseReqs: { type: Map, required: true },
    //[ "BMI 501" : [1,1], "BMI 502/503" : [1,1], "BMI 513" : [1,1], ]
    electiveCourseReqs: { type: Map, required: true },
    // [ "BMI 517" : [1,1], "BMI 590" : [1+], "BMI 591" : [1,2],
    timeLimit: { type: Number, required: true },
    // ["Full-time" : 3, "Part-time" : 5]
    creditEq: { type: Number, required: true }, // ?
    thesisOption: { type: Boolean, required: true },
    projectOption: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const BmiDegreeReqs = mongoose.model("BmiDegreeReqs", BmiDegreeSchema);

module.exports = BmiDegreeReqs;
// module.exports.degreeSchema = degreeSchema;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    courseName: { type: String, required: true },
    courseIden: { type: String, required: true },
    department: { type: String, required: true },
    credits: { type: Number, required: true },
    preReqs: { type: String, required: true },
    courseDescription: { type: String, required: true },
    yearTrends: { type: Map, required: true },
    timeSlots: { type: Map, required: true },
    professorNames: { type: Map, required: true },
  },
  {
    timestamps: true,
  }
);

const Courses = mongoose.model("Courses", coursesSchema);

module.exports = Courses;

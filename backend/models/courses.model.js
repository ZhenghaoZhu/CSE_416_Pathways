const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    id: {type: String, required: true, minLength: 1},
    courseName: { type: String, required: true, minLength: 1 },
    courseIden: { type: String, required: true, minLength: 1 },
    department: { type: String, required: true, minLength: 1 },
    credits: { type: Number, required: true },
    preReqs: { type: String, required: true, minLength: 1 },
    courseDescription: { type: String, required: true, minLength: 1 },
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

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    id: { type: String, required: true, minLength: 1 },
    // 220
    courseName: { type: String, required: true, minLength: 1 },
    // Sys Fundamentals I
    department: { type: String, required: true, minLength: 1 },
    // CSE
    credits: { type: Number, required: true },
    preReqs: { type: String, required: true, minLength: 1 },
    courseDescription: { type: String, required: true, minLength: 1 },
    yearTrends: { type: Map, required: true },
    courseInfo: { type: Map, required: true },
    // {"Fall 2020" : [1, "MW 10:30pm - 11:30pm"], "Spring 2021" : [2, "TuTh 10:30pm - 11:30pm"]}
    professorNames: { type: Map, required: true },
  },
  {
    timestamps: true,
  }
);

const Courses = mongoose.model("Courses", coursesSchema);

module.exports = Courses;

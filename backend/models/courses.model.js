const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    id: { type: String, requireted: true, minLength: 1 }, // CSE220
    department: { type: String, required: true, minLength: 1 }, // CSE
    courseNum: { type: String, required: true, minLength: 1 }, // 220
    courseName: { type: String, required: true, minLength: 1 }, // Sys Fundamentals
    credits: { type: Number, required: true }, // 3
    preReqs: { type: Array, required: true }, // [CSE Course1, CSE Course2]
    courseDescription: { type: String, required: true, minLength: 1 }, // "Something"
    yearTrends: { type: Map, required: true }, // See PowerPoint
    courseInfo: { type: Map, required: true },
    // {"Spring 2021" : ["MW 10:30pm - 11:30pm","TuTh 10:30pm - 11:30pm"], "Spring 2022" : ["TuTh 10:30pm - 11:30pm"]}
    professorNames: { type: Map, required: true },
    // {"Spring 2021" : [1, "Professor1"], "Spring"}
  },
  {
    timestamps: true,
  }
);

const Courses = mongoose.model("Courses", coursesSchema);

module.exports = Courses;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursesSchema = new Schema(
    {
        id: { type: String, required: true}, // CSE220
        department: { type: String, required: true}, // CSE
        courseNum: { type: String, required: true}, // 220
        courseName: { type: String, required: true}, // Sys Fundamentals
        semester: { type: String, required: true}, //Spring
        year: { type: String, required: true}, //2020
        credits: { type: Number, required: true }, // 3
        preReqs: { type: Array, required: true }, // [CSE Course1, CSE Course2]
        courseDescription: { type: String, required: true}, // "Something"
        yearTrends: { type: Array, required: true }, // See PowerPoint
        courseInfo: { type: Array, required: true },
        // {"Fall 2020" : [1, "MW 10:30pm - 11:30pm"], "Spring 2021" : [2, "TuTh 10:30pm - 11:30pm"]}
        professorNames: { type: Array, required: true },
        // {"Spring 2021" : [1, "Professor1"], "Spring"}
    },
    {
        timestamps: true,
    }
);

const Courses = mongoose.model("Courses", coursesSchema);

module.exports = Courses;

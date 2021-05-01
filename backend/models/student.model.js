//SAMPLE MODEL
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const degreeReqs = require("./degreeReqs.model");

const degreeReqsSchema = degreeReqs.degreeSchema;

const studentSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        id: { type: Number, required: true },
        email: { type: String, required: true },
        gpa: { type: Number, required: true },
        department: { type: String, required: true },
        track: { type: String, required: true },
        reqVersionSem: { type: String, required: true },
        reqVersionYear: { type: String, required: true },
        entrySem: { type: String, required: true },
        entryYear: { type: String, required: true },
        gradSem: { type: String, required: true },
        gradYear: { type: String, required: true },
        coursePlan: { type: Map, required: true },
        // {"Spring 2020": [Course1, Course2, ...], "Fall 2020": [Course1, Course2, ...], "Spring 2021": [Course1, Course2, ...], "Fall 2021": [Course1, Course2, ...]}
        projectOption: { type: String, required: true },
        facultyAdvisor: { type: String, required: true },
        proficiencyReq: { type: Array, required: true },
        degreeRequirements: { type: Map, required: true }, //TODO CHECK
        curSem: { type: String, required: true },
        curYear: { type: String, required: true },
        password: { type: Array, required: true },
        graduated: { type: Boolean, required: true },
        settings: { type: String, required: true },
        comments: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

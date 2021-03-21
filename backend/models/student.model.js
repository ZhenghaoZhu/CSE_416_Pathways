//SAMPLE MODEL
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const degreeReqs = require("./degreeReqs.model");

const degreeReqsSchema = degreeReqs.degreeSchema;

const studentSchema = new Schema(
  {
    first_name: { type: String, required: true, minLength: 1 },
    last_name: { type: String, required: true, minLength: 1 },
    sbu_id: { type: Number, required: true, length: 9 }, //TODO might work?
    email: { type: String, required: true },
    gpa: { type: Number, required: true },
    department: { type: String, required: true },
    track: { type: String, required: true },
    reqVersion: { type: String, required: true },
    entrySem: { type: String, required: true },
    entryYear: { type: String, required: true },
    gradSem: { type: String, required: true },
    coursePlan: { type: String, required: true }, //TODO
    projectOption: { type: String, required: true },
    faculty_advisor: { type: String, required: true },
    proficiencyReq: { type: Array, required: true },
    reqVersion: { type: degreeReqsSchema, required: true }, //TODO CHECK
    password: { type: String, required: true },
    graduated: { type: Boolean, required: true },
    settings: { type: String, required: true }, //TODO
    comments: { type: Array, required: true }, //TODO
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Student", studentSchema);

module.exports = Exercise;

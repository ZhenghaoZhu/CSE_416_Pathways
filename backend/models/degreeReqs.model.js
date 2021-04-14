//SAMPLE MODEL
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const degreeSchema = new Schema(
    {
        department: { type: String, required: true },
        gpaReq: { type: Number, required: true },
        track: { type: String, required: true },
        reqVersionSem: { type: String, required: true },
        reqVersionYear: { type: String, required: true },
        courseReqs: { type: Map, required: true },
        timeLimit: { type: Number, required: true },
        creditEq: { type: Number, required: true },
        tracks: { type: Map, required: true},
        thesisOption: { type: Boolean, required: true },
        noThesisOption: { type: Boolean, required: true },
        projectOption: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    }
);

const DegreeReqs = mongoose.model("Degree", degreeSchema);

module.exports = DegreeReqs;

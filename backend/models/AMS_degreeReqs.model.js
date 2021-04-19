//SAMPLE MODEL
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const amsDegreeSchema = new Schema(
    {
        department: { type: String, required: true },
        gpaReq: { type: Number, required: true },
        reqVersionSem: { type: String, required: true },
        reqVersionYear: { type: String, required: true },
        timeLimit: { type: Number, required: true },
        tracks: { type: Map, required: true },
    },
    {
        timestamps: true,
    }
);

const DegreeReqs = mongoose.model("ams", amsDegreeSchema);

module.exports = DegreeReqs;

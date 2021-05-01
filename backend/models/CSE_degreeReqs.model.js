//SAMPLE MODEL
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CSEdegreeSchema = new Schema(
    {
        department: {
            type: String,
            required: true,
            trim: true,
        },
        gpaReq: { type: Number, required: true },
        reqVersionSem: { type: String, required: true },
        reqVersionYear: { type: String, required: true },
        timeLimit: { type: Number, required: true },
        minCredits: { type: Number, required: true },
        tracks: { type: Map, require: true },
    },
    {
        timestamps: true,
    }
);

const CSEdegreeReq = mongoose.model("cse", CSEdegreeSchema);

module.exports = CSEdegreeReq;

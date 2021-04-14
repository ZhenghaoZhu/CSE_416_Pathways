//SAMPLE MODEL
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CEdegreeSchema = new Schema(
    {
        department: {
            type: String,
            required: true,
            trim: true,
        },
        gpaReq: { type: Number, required: true },
        //removed track since no track needed.
        reqVersionSem: { type: String, required: true },
        reqVersionYear: { type: String, required: true },
        timeLimit: { type: Number, required: true },
        tracks: {type: Map, require: true },
        thesisOption: { type: Boolean, required: true },
        //removed project since there is no project required.
    },
    {
        timestamps: true,
    }
);

const CEdegreeReq = mongoose.model("ece", CEdegreeSchema);

module.exports = CEdegreeReq;

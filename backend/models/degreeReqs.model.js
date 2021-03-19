//SAMPLE MODEL
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const degreeSchema = new Schema({
  department: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    // minlength: 3
  },
  gpaReq: { type: Number, required: true, },
  track: { type: String, required: true, },
  reqVersionSem: { type: String, required: true, },
  reqVersionYear: { type: String, required: true, },
  courseReqs: { type: Map, required: true, },
  timeLimit: { type: Number, required: true, },
  creditEq: { type: Number, required: true, },
  thesisOption: { type: Boolean, required: true, },
  noThesisOption: { type: Boolean, required: true, },
  projectOption: { type: Boolean, required: true, },
}, {
  timestamps: true,
});

const User = mongoose.model('Degree', degreeSchema);

module.exports = User;
module.exports.degreeSchema = degreeSchema;
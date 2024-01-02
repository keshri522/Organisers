const mongoose = require("mongoose");
const User = require("../../Modal/User/UserSchema");
// this is the visist schema
const studyDataSchema = new mongoose.Schema({
  visit: {
    type: String,
    required: true,
  },
  day: { type: Number, required: true },
  plus: { type: Number, required: true },
  minus: { type: Number, required: true },
});
// creating the modal or collection for that types of schema that contains the array of object with the userShhemas
const StudyData = new mongoose.Schema(
  {
    studyName: { type: String, required: true },
    studyData: { type: [studyDataSchema], required: true },
    userSpecific: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
// creating collection with this particular schema
const StudyCollection = mongoose.model("StudyData", StudyData);
module.exports = StudyCollection;

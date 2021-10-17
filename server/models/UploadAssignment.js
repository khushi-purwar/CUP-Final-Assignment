const mongoose = require('mongoose');

const { Schema } = mongoose;

const UplaodAssignmentSchema = Schema(
  {
    title: { type: String, trim: true, required: [true, 'Add a title'] },
    description: { type: String, trim: true, required: [true, 'Add a description'] },
    githubUrl: { type: String, trim: true, required: [true, 'Add a Github Url'] },
    videoUrl: { type: String, trim: true, required: [true, 'Add a Video Url'] },
    hostedUrl: { type: String, trim: true, required: [true, 'Add a Hosted Website Url'] }
  },
  { timestamps: true }
);

const UplaodAssignmentModel = mongoose.model('UplaodedAssignment', UplaodAssignmentSchema);
module.exports = UplaodAssignmentModel;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const gradeSchema = Schema(
  {
    grade: { type: Number, min: 0, max: 10, required: [true, 'Add a grade'] },
    _assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' },
    _student: { type: Schema.Types.ObjectId, ref: 'Student' },
    _teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' }
  },
  { timestamps: true }
);

const Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade;

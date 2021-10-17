const router = require('express').Router();
const auth = require('../../config/auth');
const isAdmin = require('../../utils/isAdmin');
const Assignment = require('../../models/Assignment');
const UplaodAssignment = require('../../models/UploadAssignment');
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');

// @route    Post api/assignments
// @desc     Create a Assignment
// @access   Admin
router.post('/', auth, isAdmin, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(401).send({
      message: 'Only Admin can create a Assignment'
    });
  const { title, description, _teacher, _students } = req.body;
  const assignment = new Assignment({
    title,
    description,
    _teacher
  });
  assignment._students = [...assignment._students, ..._students];

  try {
    // Find teacher and save the assignment
    const teacher = await Teacher.findById(_teacher);
    if (!teacher) return res.status(404).send({ message: 'Teacher not found' });
    if (teacher.assignment)
      return res.status(404).send({
        message: 'Teacher have already a Assignment'
      });
    teacher.assignment = assignment._id;
    await teacher.save();
    // For each student...
    // eslint-disable-next-line consistent-return
    _students.forEach(async id => {
      const student = await Student.findById(id);
      if (!student) return res.status(404).send({ message: 'Student not found' });
      // throw new ErrorResponse('Teacher not found', 401);
      if (!student.assignments.includes(assignment._id)) {
        student.assignment.push(assignment._id);
        await student.save();
      }
    });
    await assignment.save();
    return res.status(201).send({ assignment });
  } catch (e) {
    return res.status(400).send(e);
  }
});

// @route    Post api/uploadAssignment/upload
// @desc     Uplaod a Assignment
// @access   Student
router.post('/upload', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student')
      return res.status(401).send({
        message: 'Only student can upload a Assignment'
      });

    const { title, description, githubUrl, videoUrl, hostedUrl } = req.body;
    const uplaodedassignment = new UplaodAssignment({
      title,
      description,
      githubUrl,
      videoUrl,
      hostedUrl
    });
    await uplaodedassignment.save();
    return res.status(201).send({ uplaodedassignment });
  } catch (e) {
    return res.status(400).send(e);
  }
});

// @route    Get api/assignments
// @desc     Get all assignments
// @access   Admin
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const assignments = await Assignment.find({})
      .populate({ path: '_teacher', populate: { path: '_user', select: ['name', 'email'] } })
      .populate({ path: '_students', populate: { path: '_user', select: ['name', 'email'] } });

    res.send(assignments);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route    Get api/assignment/:id
// @desc     Get a assignment by id
// @access   All
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const assignments = await Assignment.findById(id)
      .populate({ path: '_teacher', populate: { path: '_user', select: ['name', 'email'] } })
      .populate({ path: '_students', populate: { path: '_user', select: ['name', 'email'] } });

    return !assignments ? res.sendStatus(404) : res.send(assignments);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// @route    Patch api/assignments/:id
// @desc     Update a assignment by id
// @access   Admin
router.patch('/:id', auth, isAdmin, async (req, res) => {
  const validationErrors = [];
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description'];
  const isValidOperation = updates.every(update => {
    const isValid = allowedUpdates.includes(update);
    if (!isValid) validationErrors.push(update);
    return isValid;
  });

  if (!isValidOperation)
    return res.status(400).send({ message: `Invalid updates: ${validationErrors.join(',')}` });

  try {
    const _id = req.params.id;
    const assignment = await Assignment.findById(_id);
    if (!assignment) return res.sendStatus(404);
    // eslint-disable-next-line no-return-assign
    updates.forEach(update => (assignment[update] = req.body[update]));
    await assignment.save();

    return res.send(assignment);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// @route    Delete api/assignments/:id
// @desc     Delete a assignment by id
// @access   Admin
router.delete('/:id', auth, isAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    const assignment = await Assignment.findByIdAndDelete(_id);
    if (!assignment) return res.sendStatus(404);

    return res.send({ message: 'Assignment Deleted' });
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;

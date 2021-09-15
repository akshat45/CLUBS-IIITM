const express = require("express");
const router = express.Router();
const students = require('../controllers/students');


router.route('/')
   .get(students.index)
   .post(students.createStudent);


router.get('/new', students.renderNewForm);

router.route('/:id')
    .get(students.showStudent)
    .put(students.updateStudent)
    .delete(students.deleteStudent);

router.get('/:id/edit', students.renderEditForm);

module.exports = router;


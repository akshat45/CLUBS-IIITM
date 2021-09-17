import express from "express";
const router = express.Router();
import {index, createStudent, renderNewForm, renderEditForm, showStudent, updateStudent, deleteStudent} from '../controllers/students.js';


router.route('/')
   .get(index)
   .post(createStudent);


router.get('/new', renderNewForm);

router.route('/:id')
    .get(showStudent)
    .put(updateStudent)
    .delete(deleteStudent);

router.get('/:id/edit', renderEditForm);

export default router;


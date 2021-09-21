import studentModel from '../models/students.js';

export const index = async (req, res) => {
    const students = await studentModel.find({});
    res.json(students);
    //res.render('students/index', {students});
}

export const renderNewForm = async (req, res) => {
    res.render('students/new');
}

export const createStudent = async (req, res, next) => {
    try {
        const student = new studentModel(req.body);
        await student.save();
        res.json(student);
        
    } catch (error) {
        res.send(error.message);
    }
}

export const showStudent = async (req, res) => {
    const student = await studentModel.findById(req.params.id);
    if(!student) {
        console.log("Cannot find that student");
        return res.redirect('/students');
    }
    res.render('students/show', {student});
}

export const renderEditForm = async (req, res) => {
    const student = await studentModel.findById(req.params.id);
    if(!student) {
        console.log("Cannot find that student");
        return res.redirect('/students');
    }
    //res.json()
    //res.render('students/edit', {student});
}

export const updateStudent = async (req, res) => {
    const student = await studentModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/students/${student._id}`);
}

export const deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/students');
}

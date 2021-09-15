const Student = require('../models/students');

module.exports.index = async (req, res) => {
    const students = await Student.find({});
    res.render('students/index', {students});
}

module.exports.renderNewForm = async (req, res) => {
    res.render('students/new');
}

module.exports.createStudent = async (req, res, next) => {
    const student = new Student(req.body);
    await student.save();
    res.redirect(`/students/${student._id}`);
}

module.exports.showStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if(!student) {
        console.log("Cannot find that student");
        return res.redirect('/students');
    }
    res.render('students/show', {student});
}

module.exports.renderEditForm = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if(!student) {
        console.log("Cannot find that student");
        return res.redirect('/students');
    }
    res.render('students/edit', {student});
}

module.exports.updateStudent = async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/students/${student._id}`);
}

module.exports.deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/students');
}

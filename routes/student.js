import express from "express";
import { getStudent, putStudent, delStudent } from "../controllers/students";

const router = express.Router();

router.get("/:studentId/profile", async function(req,res,next){

    const student = getStudent(req,res);

    if(Object.prototype.toString.call(student) === "[object Error]")
    {
        if((student.status) < 500)
        res.status(student.status).send(student.message);
        else
        next(student.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json(student);
    }

});

router.get("/:studentId/edit", async function(req,res,next){

    const student = getStudent(req,res);

    if(Object.prototype.toString.call(student) === "[object Error]")
    {
        if((student.status) < 500)
        res.status(student.status).send(student.message);
        else
        next(student.message);
    }
    else
    {
        if(student._id != req.session.passport.user)
        {
            var err = new Error("You are not authorized to edit this student.");
            err.status = 400;
            res.status(error.status).send(error.message); 
        }
    
        res.setHeader("ContentType", "application/json");
        res.status(200).json({ message: "The student edit form will render here.", student: student });
    }

});

router.put("/:studentId/", async function(req,res,next){

    const student = await putStudent(req,res);

    if(Object.prototype.toString.call(student) === "[object Error]")
    {
        if((student.status) < 500)
        res.status(student.status).send(student.message);
        else
        next(student.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("The student is updated successfully.");
    }

});

router.delete("/:studentId/", async function(req,res,next){

    const student = await delStudent(req,res);

    if(Object.prototype.toString.call(student) === "[object Error]")
    {
        if((student.status) < 500)
        res.status(student.status).send(student.message);
        else
        next(student.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("The student is deleted successfully.");
    }

});

export default router;

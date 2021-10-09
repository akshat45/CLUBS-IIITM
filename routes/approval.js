import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import approvalModel from "../models/approvals.js";
import { approveApproval, declineApproval } from "../controllers/approvals.js";
// import { usern, passw } from "../credentials.js"

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.usern,
        pass: process.env.passw
    }
});


router.get("/:approvalId/approve", async function (req, res, next) {

    const approve = await approveApproval(req, res);

    if (Object.prototype.toString.call(approve) === "[object Error]") 
    {
        if ((approve.status) < 500)
        res.status(approve.status).send(approve.message);
        else
        next(approve.message);
    }
    else 
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json({ message: "The approval approved successfully."});

        var mailOptions =  
        {
            from: usern,
            to: approve.studentid.email,
            subject: `WELCOME to ${approve.clubid.name} Club`,
            text: `Congratulations ${approve.studentid.name}, your approval for joining the ${approve.clubid.name} Club is approved.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            next(error);
        });
    }

});

router.get("/:approvalId/decline", async function (req, res, next) {

    const decline = await declineApproval(req, res);

    if (Object.prototype.toString.call(decline) === "[object Error]") {

        if ((decline.status) < 500)
        res.status(decline.status).send(decline.message);
        else
        next(decline.message);
    }
    else 
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json({ message: "The Approval declined Successfully."});

        var mailOptions = {
            from: usern,
            to: decline.studentid.email,
            subject: `Approval Declined`,
            text: `Sorry ${decline.studentid.name}, you approval for joining the ${decline.clubid.name} Club was declined.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            next(error);
        });
    }

});

router.get("/:approvalId/meet", async function (req, res, next) {

    if(req.session.passport === undefined)
    {
        var err = new Error("You are not logged in.");
        err.status = 400;
        res.status(400).send(err.message);
        return;
    }

    const { approvalId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(approvalId))
    {
        var err = new Error("The Approval doesn't exsist.");
        err.status = 406;
        res.status(406).send(err.message)
        return;
    }
    var approval;

    try {
        approval = await approvalModel.findById(approvalId)
                                      .populate("clubid", "presidentid")
                                      .populate("studentid", "name");
        
    } catch (error) {
        error.message = "Unable to access database.";
        res.status(500).send(error.message);
        return;        
    }

    if(approval == null)
    {
        var err = new Error("The Approval doesn't exsist.");
        err.status = 400;
        res.status(400).send(err.message);
        return;
    }
    
    if(req.session.passport.user != approval.clubid.presidentid )
    {
        var err = new Error("You are not president of club.");
        err.status = 400;
        res.status(400).send(err.message);
        return;
    }

    // res.status(200).send("Meet form will be loaded here.");
    res.render('scheduleInterview',{approval});

});

router.post("/:approvalId/meet", async function(req, res, next){

    if(req.session.passport === undefined)
    {
        var err = new Error("You are not logged in.");
        err.status = 400;
        res.status(400).send(err.message);
        return;
    }

    const { approvalId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(approvalId))
    {
        var err = new Error("The Approval doesn't exsist.");
        err.status = 406;
        res.status(406).send(err.message)
        return;
    }

    const body = req.body;

    function makeid() 
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }

    const meet = `meet.google.com/lookup/${makeid()}`;

    var approval;

    try {
        approval = await approvalModel.findById(approvalId)
                                .populate("studentid", ["name", "email"])
                                .populate("clubid", ["name", "presidentid"]);
        
    } catch (error) {
        error.message = "Unable to access database.";
        res.status(500).send(error.message);
        return;        
    }

    if(approval == null)
    {
        var err = new Error("The Approval doesn't exsist.");
        err.status = 400;
        res.status(400).send(err.message);
        return;
    }
    
    if(req.session.passport.user != approval.clubid.presidentid )
    {
        var err = new Error("You are not president of club.");
        err.status = 400;
        res.status(400).send(err.message);
        return;
    }

    var mailOptions = {
        from: usern,
        to: approval.studentid.email,
        bcc: req.user.email,
        subject: "Invitation to interview",
        text: `Dear ${approval.studentid.name},\nThe president of ${approval.clubid.name} Club wants to interview you on ${body.date} at ${body.time}.\nThe meet link is ${meet}.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        res.status(error.status).send(error.message);
        next(error);
        return;
    });

    res.status(200).json({ message: "Interview Scheduled Successfully for details check your mail." })
    
});

export default router;
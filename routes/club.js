import express from "express";
import clubModel from "../models/clubs.js";
import { getClub, postClub } from "../controllers/clubs.js";
import { postEvent } from "../controllers/events.js";
import { getClubApprovals, postApproval } from "../controllers/approvals.js";

const router = express.Router();

router.get("/:clubId", async function(req,res,next) {

    const club = await getClub(req,res);
    const approvals = await getClubApprovals(req,res);

    switch ("[object Error]") {
        case Object.prototype.toString.call(club):
            if((club.status) < 500)
            res.status(club.status).send(club.message);
            else
            next(club.message);
            break;
        
        case Object.prototype.toString.call(approvals):
            if((approvals.status) < 500)
            res.status(approvals.status).send(approvals.message);
            else
            next(approvals.message);
            break;
    
        default:
            res.setHeader("ContentType", "application/json");
            res.status(200).json({ club: club, approvals: approvals });
            break;
    }
});

router.post("/", async function(req,res,next) {

    const club = await postClub(req,res);

    if(Object.prototype.toString.call(club) === "[object Error]")
    {
        if((club.status) < 500)
        res.status(club.status).send(club.message);
        else
        next(club.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json(club);
    }

});

router.get("/:clubId/event", async function(req,res,next){

    if(req.session.passport === undefined)
    {
        var err = new Error("You are not logged in.");
        err.status = 400;
        res.status(err.status).send(err.message);
    }
    
    const { clubId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(clubId))
    {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        res.status(err.status).send(err.message);
    }

    var club;
    
    try {
        club = await clubModel.findOne({ _id: clubId });
        
    } catch (error) {
        error.message = "Unable to connect with database.";
        res.status(error.status).send(error.message);          
    }

    if(club === null)
    {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        res.status(error.status).send(error.message); 
    }

    if(club.residentid != req.session.passport.user)
    {
        var err = new Error("You are not president of club.");
        err.status = 400;
        res.status(error.status).send(error.message); 
    }

    res.status(200).send("The event creation form will render here.")
});

router.put("/:eventId", async function(req,res,next) {

    const event = await putEvent(req,res);

    if(Object.prototype.toString.call(event) === "[object Error]")
    {
        if((event.status) < 500)
        res.status(event.status).send(event.message);
        else
        next(event.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("The event is updated successfully.");
    }
});

router.post("/:clubId/event", async function(req,res,next) {

    const event = await postEvent(req,res);

    if(Object.prototype.toString.call(event) === "[object Error]")
    {
        if((event.status) < 500)
        res.status(event.status).send(event.message);
        else
        next(event.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json(event);
    }

});

router.post("/:clubId/approval", async function(req,res,next) {

    const approval = await postApproval(req,res);

    if(Object.prototype.toString.call(approval) === "[object Error]")
    {
        if((approval.status) < 500)
        res.status(approval.status).send(approval.message);
        else
        next(approval.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("Your approval has been submitted successfully.");
    }

});

export default router;
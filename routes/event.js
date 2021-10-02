import express from "express";
import eventModel from "../models/events.js";
import { getEvent, putEvent, delEvent } from "../controllers/events.js";

const router = express.Router();

router.get("/:eventId", async function(req,res,next) {

    const event = await getEvent(req,res);

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

router.get("/:eventId/edit", async function(req,res,next){

    const event = getEvent(req,res);

    if(Object.prototype.toString.call(event) === "[object Error]")
    {
        if((event.status) < 500)
        res.status(event.status).send(event.message);
        else
        next(event.message);
    }
    else
    {
        if(event.clubid.presidentid != req.session.passport.user)
        {
            var err = new Error("You are not president of club.");
            err.status = 400;
            res.status(error.status).send(error.message); 
        }
    
        res.setHeader("ContentType", "application/json");
        res.status(200).json({ message: "The event edit form will render here.", event: event });
    }

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

router.delete("/:eventId", async function(req,res,next) {

    const event = await delEvent(req,res);

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
        res.status(200).send("The event is deleted successfully.");
    }
});

export default router;
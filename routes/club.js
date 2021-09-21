import express from "express";
import { getClub, postClub } from "../controllers/clubs.js";
import { postEvent } from "../controllers/events.js";

const router = express.Router();

router.get("/:clubId", async function(req,res,next) {

    const club = await getClub(req,res);

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

export default router;
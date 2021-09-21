import express from "express";
import { getTechClubs, getCultClubs } from "../controllers/clubs.js";
import { getUpcomingEvents } from "../controllers/events.js";
import { createStudent, index } from "../controllers/students.js";

const router = express.Router();

router.get('/', async function(req,res,next) {

    const techClubs = await getTechClubs(req,res);
    const cultClubs = await getCultClubs(req,res);
    const recentevents = await getUpcomingEvents(req,res);

    switch ("[object Error]") {
        case Object.prototype.toString.call(techClubs):
            if((techClubs.status) < 500)
            res.status(techClubs.status).send(techClubs.message);
            else
            next(techClubs.message);
            break;
        
        case Object.prototype.toString.call(cultClubs):
            if((cultClubs.status) < 500)
            res.status(cultClubs.status).send(cultClubs.message);
            else
            next(cultClubs.message);
            break;
        
        case Object.prototype.toString.call(recentevents):
            if((recentevents.status) < 500)
            res.status(recentevents.status).send(recentevents.message);
            else
            next(recentevents.message);
            break;
    
        default:
            res.setHeader("ContentType", "application/json");
            res.render('home');
            //res.status(200).json({ techClubs: techClubs, cultClubs: cultClubs, recentevents: recentevents});
            break;
    }

    
});

router.post('/student', createStudent);
router.get('/student', index);

export default router;
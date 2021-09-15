import express from "express";

import { getEvent, postEvent , putEvent , delEvent} from "../controllers/events.js";

const router = express.Router();

router.get("/", getEvent);
router.post("/", postEvent);
router.put("/", putEvent);
router.delete("/", delEvent);


export default router;
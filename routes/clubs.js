import express from "express";

import { getClubs, postClub, putClub, delClub } from "../controllers/clubs.js";

const router = express.Router();

router.get("/", getClubs);
router.post("/", postClub);
router.put("/", putClub);
router.delete("/", delClub);

export default router;
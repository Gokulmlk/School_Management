import express from "express";
import { addSchool, listSchools } from "../controllers/schoolController.js";
import { validateAddSchool, validateListSchools } from "../middlewares/validate.js";

const router = express.Router();

// POST /addSchool
router.post("/addSchool", validateAddSchool, addSchool);

// GET /listSchools?latitude=xx&longitude=yy
router.get("/listSchools", validateListSchools, listSchools);

export default router;
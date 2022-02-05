import express from "express";
import { getAll, getById } from "../controllers/movies";
const router = express.Router();

/* GET movies */
router.get("/", getAll);
router.get("/:id", getById);

export default router;

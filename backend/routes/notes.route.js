import express from "express";
import { getAllNotesController } from "../controller/notes.controller.js";

const router = express.Router();  

router.get("/", getAllNotesController);

export default router; 


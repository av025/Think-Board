import express from "express";
import {
  createNoteController,
  getAllNotesController,
  updateNoteController,
  deleteNoteController,
} from "../controller/notes.controller.js";

const router = express.Router();

router.get("/", getAllNotesController);

router.post("/", createNoteController);

router.put("/:id", updateNoteController);

router.delete("/:id", deleteNoteController);

export default router;

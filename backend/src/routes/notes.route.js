import express from "express";
import {
  createNoteController,
  getAllNotesController,
  updateNoteController,
  deleteNoteController,
  getNotesByIdController,
} from "../controller/notes.controller.js";

const router = express.Router();

router.get("/", getAllNotesController); 

router.get("/:id", getNotesByIdController);

router.post("/", createNoteController);

router.put("/:id", updateNoteController);

router.delete("/:id", deleteNoteController);

export default router;

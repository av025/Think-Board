import Note from "../model/notes.model.js";

export const getAllNotesController = async (_, response) => {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    response.status(200).json(notes);
  } catch (error) {
    console.error(
      `Error Message  While Getting Fetch Notes : ${error.message}`
    );
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getNotesByIdController = async (request, response) => {
  const { id } = request.params;
  try {
    const noteById = await Note.findById(id);
    if (!noteById) {
      return response
        .status(404)
        .json({ success: false, message: "Note Not Found" });
    }

    response.status(200).json({
      success: true,
      message: "Successfully Fetch Note By Id",
      data: noteById,
    });
  } catch (error) {
    console.error(
      `Error Message  While Getting Fetch Notes By Id : ${error.message}`
    );
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const createNoteController = async (request, response) => {
  try {
    const { title, content } = request.body;
    const newNote = new Note({ title, content });

    if (!newNote.title || !newNote.content) {
      response
        .status(400)
        .json({ success: false, message: "Pleas fill all the required field" });
    }

    const savedNote = await newNote.save();
    response.status(201).json({
      success: true,
      message: "Note Created Successfully ",
      data: savedNote,
    });
  } catch (error) {
    console.error(
      `Error Message  While Getting Fetch Notes : ${error.message}`
    );
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateNoteController = async (request, response) => {
  const { title, content } = request.body;
  const { id } = request.params;

  try {
    const updateNote = await Note.findByIdAndUpdate(id, { title, content }, {new:true});

    if (!updateNote.title || !updateNote.content) {
      return response
        .status(400)
        .json({ success: false, message: "Please fill this required Field" });
    }

    response.status(200).json({
      success: true,
      message: "Note Successfully Updated",
      data: updateNote,
    });
  } catch (error) {
    console.error(
      `Error Message  While Getting Updating Notes : ${error.message}`
    );
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteNoteController = async (request, response) => {
  const { id } = request.params;
  try {
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) {
      return response
        .status(404)
        .json({ success: false, message: "Note Not Found" });
    }

    response
      .status(200)
      .json({ success: true, message: "Note Deleted Successfully" });
  } catch (error) {
    console.error(
      `Error Message  While Getting Delete Notes : ${error.message}`
    );
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

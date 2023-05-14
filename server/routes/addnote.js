import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import Note from "../models/notes.js";
const router = Router();

router.post("/addNote", verifyToken, async (req, res) => {
  let { note_id, note_data, last_updated, note_title, note_snippet } = req.body;
  console.log(req.body);
  console.log(req.user);

  let existingNote = await Note.findOne({ note_id: note_id });

  if (existingNote) {
    console.log("Note already exists");
    try {
      await Note.updateOne(
        { note_id: note_id },
        {
          last_updated: last_updated,
          note_data: note_data,
          note_snippet: note_snippet,
          note_title: note_title,
        }
      );
    } catch (err) {
      console.error(err);
    }
  } else {
    const note = new Note({
      note_title: note_title,
      note_id: note_id,
      note_snippet: note_snippet,
      note_data: note_data,
      last_updated: last_updated,
      user_id: req.user.user_id,
    });
    const savedNote = await note.save();
    console.log("Saved new note", savedNote);
  }

  res.status(200).send({ message: "Note saved successfully" });
});

export default router;

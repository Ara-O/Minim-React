import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema({
  note_id: String,
  note_title: String,
  note_snippet: String,
  note_data: String,
  last_updated: Number,
  user_id: String,
});

const Note = mongoose.model("Note", notesSchema, "notes");

export default Note;

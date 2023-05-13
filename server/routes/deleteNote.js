import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import Note from "../models/notes.js";
const router = Router();

router.get("/deleteNote", verifyToken, async (req, res) => {
  console.log("deleting note", req.query, req.user.user_id);
  try {
    await Note.deleteOne({
      note_id: req.query.note_id,
      user_id: req.user.user_id,
    });
    res.status(200).send({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
  }
});
export default router;

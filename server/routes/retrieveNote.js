import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import Note from "../models/notes.js";
const router = Router();

router.get("/retrieveNote", verifyToken, async (req, res) => {
  console.log(req.query);
  const note_id = req.query.note_id;
  console.log(req.user);
  let retrievedNote = await Note.findOne({
    note_id: note_id,
    user_id: req.user.user_id,
  });
  console.log(retrievedNote);
  res.status(200).send(retrievedNote);
});

export default router;

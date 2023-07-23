import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
const router = Router();
import Note from "../models/notes.js";

router.get("/loadAllNotes", verifyToken, async (req, res) => {
  try {
    let allNotes = await Note.find({ user_id: req.user.user_id }).sort({
      last_updated: "desc",
    });
    console.log("All notes", allNotes);
    res.status(200).send({ notes: allNotes });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export default router;

import { Router } from "express";
import { openai } from "../app.js";

const router = Router();

router.post("/summarizeNote", async (req, res) => {
  let noteData = req.body.noteData;
  try {
    if (noteData.length < 200) {
      throw new Error("Note length not sufficient");
    } else {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Summarize this note in simple terms - ${req.body.noteData}`,
        max_tokens: 1400,
      });

      res.status(200).send({ summary: completion.data.choices[0].text });
      console.log(completion.data.choices);
    }
  } catch (err) {
    console.log(err.response);
    res.status(400).send({ message: err.message });
  }
});

export default router;

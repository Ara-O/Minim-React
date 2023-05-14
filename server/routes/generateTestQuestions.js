import { openai } from "../app.js";
import { Router } from "express";

const router = Router();

router.post("/generateTestQuestions", async (req, res) => {
  let noteData = req.body.noteData;
  try {
    if (noteData.length < 200) {
      throw new Error("Note length not sufficient");
    } else {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create seven sample test questions concerning this note. Only create questions related to things mentioned in the note, and give your response as an array of objects json format, something like - [{"question": "put question here", "answer": "put answer here"}] with questions and answers fields - ${req.body.noteData}`,
        max_tokens: 1400,
      });

      console.log(completion.data.choices[0].text);
      let parsedJson = JSON.parse(
        `{"questions": ${completion.data.choices[0].text}}`
      );

      if (parsedJson === undefined) {
        throw new Error({ message: "Please try again" });
      }

      console.log("parsed json", parsedJson);
      res.status(200).send({ testQuestions: completion.data.choices[0].text });
    }
  } catch (err) {
    console.log(err.response);
    res.status(400).send({ message: err.message });
  }
});
export default router;

import { openai } from "../app.js";
import { Router } from "express";

const router = Router();

router.post("/generateIdeaVisualization", async (req, res) => {
  console.log(req.body);
  try {
    const response = await openai.createImage({
      prompt: req.body.ideaToVisualize,
      n: 4,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    console.log(response.data.data);
    res.status(200).send({ url: image_url });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
});
export default router;

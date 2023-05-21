import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import register from "./routes/register.js";
import login from "./routes/login.js";
import addnote from "./routes/addnote.js";
import loadAllNotes from "./routes/loadAllNotes.js";
import deleteNote from "./routes/deleteNote.js";
import retrieveNote from "./routes/retrieveNote.js";
import summarizeNote from "./routes/summarizeNote.js";
import generateTestQuestions from "./routes/generateTestQuestions.js";
import generateIdeaVisualization from "./routes/generateIdeaVisualization.js";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

// Initializing express
const app = express();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", register);
app.use("/api", login);
app.use("/api", addnote);
app.use("/api", loadAllNotes);
app.use("/api", retrieveNote);
app.use("/api", deleteNote);
app.use("/api", summarizeNote);
app.use("/api", generateTestQuestions);
app.use("/api", generateIdeaVisualization);

app.get("/api/health", (req, res) => {
  res.status(200).send("Server working");
});

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_SECRET,
});

export const openai = new OpenAIApi(configuration);

mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("successful connection");
  })
  .catch((err) => {
    console.log(err);
  });
// mongoose
//   .connect(
//     `mongodb+srv://ara:${process.env.MONGO_PASSWORD}@minim.4evfese.mongodb.net/?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then((res) => {
//     console.log("successful connection");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

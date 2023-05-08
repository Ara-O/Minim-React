import express from "express";
import mongoose from "mongoose";
const app = express();
import path from "path";
app.use(express.static("dist"));

mongoose.connect("mongodb://localhost:27017");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/registeer", async (req, res) => {
  try {
  } catch (err) {}
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

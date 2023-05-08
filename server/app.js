import express from "express";
import mongoose from "mongoose";
import path from "path";
import register from "./routes/register.js";
import login from "./routes/login.js";

// Initializing express
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", register);
app.use("/api", login);

mongoose
  .connect("mongodb://127.0.0.1:27017/minim", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("successful connection");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

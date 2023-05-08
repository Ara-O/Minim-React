import { Router } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
const router = Router();

dotenv.config();

//Create a schema for the users table
const UserSchema = new Schema({
  username: {
    type: String,
    unique: false,
    required: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create a model based on the schema, and specify writing to users table
const User = mongoose.model("User", UserSchema, "users");

const SALT_ROUNDS = 10;

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(req.body.password, salt);
    console.log(hash);

    User.findOne({ emailAddress: req.body.emailAddress })
      .then((response) => {
        if (response === null) {
          //Creates a new user based on the model
          const newUser = new User({
            username: req.body.username,
            emailAddress: req.body.emailAddress,
            password: hash,
          });

          //Store user in database
          newUser.save();

          console.log(newUser);

          const jwt_token = jwt.sign(
            { user_id: newUser._id, email: newUser.emailAddress },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
          console.log(jwt_token);
          res.status(200).send({
            message: "User Registration Successful",
            token: jwt_token,
          });
        } else {
          res.status(409).send({ message: "User Already Exists" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(404).send();
  }
});

export default router;

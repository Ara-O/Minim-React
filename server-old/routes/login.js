import { Router } from "express";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
  let user = await User.findOne({ emailAddress: req.body.emailAddress });
  try {
    if (user === null) {
      console.log("there is no user");
      return res.status(401).send({ message: "User not found" });
    }

    let passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      console.log("Password mismatch");
      return res.status(404).send({ message: "Password does not match" });
    }

    //Creates a JWT for the user
    const jwt_token = jwt.sign(
      { user_id: user._id, email: user.emailAddress },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).send({
      message: "Login Successful",
      token: jwt_token,
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;

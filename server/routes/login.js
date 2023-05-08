import { Router } from "express";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = Router();

router.post("/login", async (req, res) => {
  console.log(req.body);
  User.findOne({ emailAddress: req.body.emailAddress })
    .then(async (user) => {
      if (user === null) {
        return res.status(404).send({ message: "User not found" });
      }

      let passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(404).send({ message: "Password does not match" });
      }

      try {
        const jwt_token = jwt.sign(
          { user_id: user._id, email: user.emailAddress },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        console.log(jwt_token);
        res.status(200).send({
          message: "Login Successful",
          token: jwt_token,
        });
      } catch (err) {
        console.log(err);
      }

      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;

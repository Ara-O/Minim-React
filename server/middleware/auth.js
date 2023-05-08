import jwt from "jsonwebtoken";

const config = process.env;

export const verifyToken = (req, res, next) => {
  console.log("verifying token");
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    console.log("Verified");
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

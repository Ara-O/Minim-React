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

    // check if the token has expired
    const isExpired = Date.now() >= decoded.exp * 1000;

    if (isExpired) {
      console.log("Token has expired");
      return res.status(401).send({ message: "Token has expired" });
    } else {
      req.user = decoded;
      console.log("Token is valid");
    }
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

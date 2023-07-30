const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(403).send("Access Denied");
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimStart();
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verified;
  next();
});

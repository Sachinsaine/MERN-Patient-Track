/* eslint-disable no-undef */

const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const jwt = require("jsonwebtoken");
const User = require("../models/user");
//verify Token

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, data) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      }
      req.user = data;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Cant not found accessToken",
    });
  }
};
exports.verifyTokenAndAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You can't do this action",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};

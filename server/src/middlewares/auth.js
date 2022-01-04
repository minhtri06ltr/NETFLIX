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
exports.emailValidate = async (req, res, next) => {
  if (req.body.username) {
    next();
  } else {
    const emailDB = await User.findOne({
      email: req.body.email,
    });

    if (emailDB) {
      return res.status(400).json({
        success: false,
        message: "Email already taken",
        validate: false,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Email don't exist",
        validate: true,
      });
    }
  }
};

exports.usernameValidate = async (req, res, next) => {
  const usernameDB = await User.findOne({
    username: req.body.username,
  });
  if (usernameDB)
    return res.status(400).json({
      success: false,
      message: "User name already taken",
      validate: false,
    });

  next();
};

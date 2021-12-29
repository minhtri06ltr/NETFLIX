const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../middlewares/mail");

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_KEY, {
    expiresIn: "5m",
  });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "15m",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "7d",
  });
};
exports.activateEmail = async (req, res) => {
  try {
    const { activationToken } = req.body;
    const user = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_KEY);
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Account has been activated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};
exports.register = async (req, res) => {
  const userDB = await User.findOne({
    username: req.body.username,
  });
  if (userDB)
    return res.status(400).json({
      success: false,
      message: "User name already taken",
    });
  const emailDB = await User.findOne({
    email: req.body.email,
  });
  if (emailDB)
    return res.status(400).json({
      success: false,
      message: "Email already taken",
    });

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.HASH_KEY
    ).toString(),
  };

  //active user with email
  const activationToken = createActivationToken(newUser);

  const url = `${process.env.CLIENT_URL}/users/activate/${activationToken}`;
  sendMail(req.body.email, url, "activate");
  console.log("hi");
  res.status(200).json({
    success: true,
    message: "Register success! Please activate your email to continue",
  });
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const bytes = await CryptoJS.AES.decrypt(
      user.password,
      process.env.HASH_KEY
    );
    const originalPassword = await bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //pass validate
    const refreshToken = createRefreshToken({ id: user._id });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refreshToken",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });
    res.status(200).json({
      success: true,
      message: "Login successfull",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};
//get accessToken from refreshToken

exports.getAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(400).json({
      success: false,
      message: "Please login",
    });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    const accessToken = createAccessToken({ id: user.id });
    res.status(200).json({
      success: true,
      message: "Get access token success",
      accessToken,
    });
  });
};
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist",
      });
    }
    const accessToken = createAccessToken({ id: user._id });
    const url = `${process.env.CLIENT_URL}/user/reset/${accessToken}`;
    sendMail(req.body.email, url, "forgotPassword");
    res.status(200).json({
      message: "Re-send password, please check your email",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    console.log(req.user);
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.HASH_KEY
        ).toString(),
      }
    );
    res.status(200).json({
      success: true,
      message: "Password have been changed",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};

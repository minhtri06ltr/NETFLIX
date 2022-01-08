const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../middlewares/mail");
const querystring = require("querystring");
const { google } = require("googleapis");
const fetch = require("node-fetch");
const axios = require("axios");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.GOOGLE_LOGIN_CLIENT_ID);

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

  res.status(200).json({
    success: true,
    message: "Register success! Please activate your email to continue",
    validate: true,
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
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
      sameSite: "None",
      secure: true,
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
      success: true,
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
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: CryptoJS.AES.encrypt(
          req.body.resetPassword,
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
exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", { path: "/api/auth/refreshToken" });
    return res.status(200).json({
      success: true,
      message: "Logout successfull",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};
exports.googleLogin = async (req, res) => {
  try {
    const verify = await client.verifyIdToken({
      idToken: req.body.tokenId,
      audience: process.env.GOOGLE_LOGIN_CLIENT_ID,
    });

    const { email_verified, email, name, picture } = verify.payload;
    const password = email + process.env.GOOGLE_LOGIN_HASH_KEY;

    if (email_verified) {
      const user = await User.findOne({ email });
      if (user) {
        const refreshToken = createRefreshToken({ id: user._id });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/auth/refreshToken",
          maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
          sameSite: "None",
          secure: true,
        });
        res.status(200).json({
          success: true,
          message: "Login successfull",
        });
      } else {
        const newUser = new User({
          email: email,
          username: name,
          password: CryptoJS.AES.encrypt(
            password,
            process.env.HASH_KEY
          ).toString(),
          profileImg: picture,
        });
        await newUser.save();
        const refreshToken = createRefreshToken({ id: newUser._id });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/auth/refreshToken",
          maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
          sameSite: "None",
          secure: true,
        });

        return res
          .status(200)
          .json({ success: true, message: "Login success!" });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please verify your email with Google first!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};

exports.facebookLogin = async (req, res) => {
  try {
    const URL = `https://graph.facebook.com/v4.0/${req.body.userId}/?fields=id,name,email,picture&access_token=${req.body.accessToken}`;
    const data = await fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    const { email, name, picture } = data;
    const password = email + process.env.FACEBOOK_LOGIN_SECRET_KEY;

    const user = await User.findOne({ email });
    if (user) {
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refreshToken",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
        sameSite: "None",
        secure: true,
      });
      res.status(200).json({
        success: true,
        message: "Login successfull",
      });
    } else {
      const newUser = new User({
        email: email,
        username: name,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.HASH_KEY
        ).toString(),
        profileImg: picture.data.url,
      });
      await newUser.save();
      const refreshToken = createRefreshToken({ id: newUser._id });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refreshToken",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
        sameSite: "None",
        secure: true,
      });

      return res.status(200).json({ success: true, message: "Login success!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};

exports.githubLogin = async (req, res) => {
  if (!req.body.code) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong with Github OAuth",
    });
  }
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.body.code}`
    )
    .then((res) => res.data)

    .catch((error) => {
      console.log("Error getting accessToken");

      throw error;
    });
  if (!githubToken) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong with Github OAuth",
    });
  }
  const decoded = querystring.parse(githubToken);
  const userInfo = await axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${decoded.access_token}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Error getting user from GitHub`);
      throw error;
    });
  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong getting user info from Github OAuth",
    });
  }
  const userEmail = await axios
    .get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${decoded.access_token}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Error getting user email from GitHub`);

      throw error;
    });
  if (!userEmail) {
    return res.status(400).json({
      success: false,
      message:
        "Something went wrong getting user email  Github OAuth, You need to public your email on Github",
    });
  }
  const { login, avatar_url } = userInfo;
  const { email, verified } = userEmail[0];
  if (!email) {
    return res.status(400).json({
      success: false,
      message:
        "Something went wrong getting user email  Github OAuth, You need to public your email on Github",
    });
  }
  const password = email + process.env.GITHUB_LOGIN_SECRET_KEY;

  if (verified) {
    const user = await User.findOne({ email });
    if (user) {
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refreshToken",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
        sameSite: "None",
        secure: true,
      });
      res.status(200).json({
        success: true,
        message: "Login successfull",
      });
    } else {
      const newUser = new User({
        email: email,
        username: login,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.HASH_KEY
        ).toString(),
        profileImg: avatar_url,
      });
      await newUser.save();
      const refreshToken = createRefreshToken({ id: newUser._id });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refreshToken",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
        sameSite: "None",
        secure: true,
      });

      return res.status(200).json({ success: true, message: "Login success!" });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please verify your email with Github first!",
    });
  }
};

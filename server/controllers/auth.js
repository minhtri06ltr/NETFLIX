const User = require("../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
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

  const hashedPassword = await argon2.hash(req.body.password); //use package argon2 to hash the password
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  newUser.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
    if (data) {
          const accessToken = jwt.sign(
    { id: data._id, isAdmin: data.isAdmin },
    process.env.TOKEN_KEY,
    { expiresIn: "5d" }
  );
      return res.status(200).json({
        success: true,
        message: "Welcome new user",
        data,
        accessToken,
      });
    }
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

    const validPassword = await argon2.verify(user.password, req.body.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const { password, ...info } = user._doc;
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.TOKEN_KEY,
      { expiresIn: "5d" }
    );
    res.status(200).json({
      success: true,
      message: "Login successfull",
      info,
      accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err,
    });
  }
};

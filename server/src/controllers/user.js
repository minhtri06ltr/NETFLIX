const User = require("../models/user");
const cloudinary = require("cloudinary");
const fs = require("fs");
//UPDATE
exports.adminUpdateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //set new data when = all req.boy
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Update user successfull",
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
//DELETE
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Delete user successfull",
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
//GET
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json({
      success: true,
      message: "Get this user successfull",
      user,
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
//GET ALL
exports.getAllUser = async (req, res) => {
  const query = req.query.new;
  //[2]: admin can delete their info
  try {
    //sort lastest data
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5).select("-password")
      : await User.find().select("-password");
    return res.status(200).json({
      success: true,
      message: "Get all user successfull",
      users,
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
//GET USER STATS
exports.getUserPerMonth = async (req, res) => {
  if (req.user.isAdmin) {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({
        success: true,
        message: "Get user aggregate successfull",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not allow to do this action",
    });
  }
};
//USER UPLOAD AVATAR
const removeTmp = (path) => {
  console.log(path);
  fs.unlink(path, (err) => {
    if (err) throw err;
    console.log("Delete successfull");
  });
};
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.uploadAvatar = async (req, res) => {
  try {
    const file = req.files.file;
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "avatar",
        width: 150, //resize picture
        height: 150,
        crop: "fill",
      },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        res.status(200).json({
          success: true,
          message: "Upload your avatar successfull",
          url: result.secure_url,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
};

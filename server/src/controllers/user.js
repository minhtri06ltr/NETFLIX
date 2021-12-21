const User = require("../models/user");
const argon2 = require("argon2");

//UPDATE
exports.updateUser = async (req, res) => {
  // [1]: user try to update their info
  //[2]: admin update their info
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, //set new data when = all req.boy
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Update user successfull",
        updatedUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not allow to do this action",
    });
  }
};
//DELETE
exports.deleteUser = async (req, res) => {

  //[2]: admin can delete their info
  if (req.user.id === req.params.id || req.user.isAdmin) {
   
    try {
      const updatedUser = await User.findByIdAndDelete(
        req.params.id,
       
      );
      return res.status(200).json({
        success: true,
        message: "Delete user successfull",
        updatedUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not allow to do this action",
    });
  }
};
//GET
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message:"Can't found this user"
           })
        }
        return res.status(200).json({
            success: true,
            message: "Get this user successfull",
            user
        })
    } catch (err) {
        console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
    
    
}
//GET ALL
exports.getAllUser = async (req, res) => {
    const query = req.query.new;
  //[2]: admin can delete their info
  if ( req.user.isAdmin) {
   
      try {
        //sort lastest data
      const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
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
        err,
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not allow to do this action",
    });
  }
};
//GET USER STATS

exports.getUserPerMonth = async (req, res) => {
    //this year
    const now = new Date();
    const lastYear = new Date(
    now.setFullYear(now.getFullYear() - 1),
  );
}

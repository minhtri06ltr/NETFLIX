const List = require("../models/list");

//ADD NEW LIST
exports.addNewList = async (req, res) => {
  const newList = new List(req.body);
  newList.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
    if (data) {
      return res.status(201).json({
        success: true,
        message: "Add new list successfull",
        data,
      });
    }
  });
};

//DELETE
exports.deleteList = async (req, res) => {
  if (req.user.isAdmin) {
    await List.findByIdAndDelete(req.user.id);
    return res.status(201).json({
      success: true,
      message: "Delete this list successfull",
    });
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to do this action",
    });
  }
};

//GET LIST
exports.getList = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    return res.status(200).json({
      success: true,
      message: "Get list successfull",
      list,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

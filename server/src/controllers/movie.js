const Movie = require("../models/movie");

//ADD NEW MOVIE
exports.addNewMovie = async (req, res) => {

  //[2]: admin can add new movie
  if ( req.user.isAdmin) {
      const newMovie = new Movie(req.body);
      newMovie.save((err, data) => {
          if (err) {
            console.log(err)
              return res.status(500).json({
                  success: false,
                  message: "Internal server error",
                  err
                  
              })
          }
          if (data) {
              return res.status(201).json({
                  success: true,
                  message: "Add new movie successfull",
                  data
              })
          }
      })
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not allow to do this action",
    });
  }
};
//UPDATE
exports.updateMovie = async (req, res) => {
  //[2]: admin can update movie
  if (req.user.isAdmin) {
 try {
      const updatedMoive = await Movie.findByIdAndUpdate(req.params.id,
      {
      $set:req.body
      }, { new: true })
    return res.status(200).json({
      success: true,
      message: "Update movie successfull",
      updatedMovie
    })
 } catch (error) {
    return res.status(500).json({
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
//DELETE MOVIE
exports.deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id)
         return res.status(200).json({
      success: true,
      message: "Delete movie successfull",
      
    })
        
      } catch (error) {
       return res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
      }

  }else {
    return res.status(403).json({
      success: false,
      message: "You are not allow to do this action",
    });
  }
};
//GET MOVIE
exports.getMovie = async (req, res) => {
 
  try {
    const movie = await Movie.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Get movie successfull",
      movie
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    })
  }
};
//GET RANDOM MOVIE

exports.getRandomMovie = async (req, res) => {
  const type = req.query.type
  let movie;
 try {
   if (type === "series") {
     movie = await Movie.aggregate([
       { $match: { isSeries: true } },
       {$sample:{size:1}}
     ])
   } else {
      movie = await Movie.aggregate([
       { $match: { isSeries: false } },
       {$sample:{size:1}}
     ])
   }
   return res.status(200).json({
     success: true,
     message: "Get random movie successfull",
     movie
   })
 } catch (error) {
   console.log(error)
   return res.status(500).json({
     success: false,
     message: "Internal server error",
     error
   })
 }
};
//GET ALL MOVIE

exports.getAllMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      movies.reverse();// get lasted movies
      return res.status(200).json({
        success: true,
        message: "Get all movie successfull",
        movies
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error
      })
    }
  } else {
    return res.status(403).json({
      success: false,
      message:"You are not allow to do this action"
    })
  }
}
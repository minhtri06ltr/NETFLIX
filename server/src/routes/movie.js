const {addNewMovie,updateMovie,deleteMovie,getMovie,getRandomMovie,getAllMovie } = require("../controllers/movie");
const {verifyToken} = require('../middlewares/auth')
const router = require("express").Router();

//ADD NEW MOVIE
router.post("/add",verifyToken,addNewMovie)
//UPDATE
router.put("/:id",verifyToken,updateMovie)
//DELETE
router.delete("/:id",verifyToken,deleteMovie)
//GET MOVIE
router.get("/find/:id", verifyToken, getMovie)
//GET ALL
router.get("/",verifyToken,getAllMovie)
//GET RANDOM MOVIE
router.get("/random",verifyToken,getRandomMovie)

module.exports = router;
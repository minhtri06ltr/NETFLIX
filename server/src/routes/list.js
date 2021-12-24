const { addNewList,deleteList,getList} = require("../controllers/list");
const {verifyToken} = require('../middlewares/auth')
const router = require("express").Router();

//ADD NEW LIST
router.post("/add", verifyToken, addNewList)
//DELETE
router.delete("/:id", verifyToken, deleteList)
//GET LISTS
router.get("/",verifyToken,getList)


module.exports = router;
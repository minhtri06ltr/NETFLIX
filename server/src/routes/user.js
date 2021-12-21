const { updateUser ,deleteUser,getUser,getAllUser,getUserPerMonth } = require("../controllers/user");
const {verifyToken} = require('../middlewares/auth')
const router = require("express").Router();

//UPDATE
router.put("/:id",verifyToken,updateUser)
//DELETE
router.delete("/:id",verifyToken,deleteUser)
//GET
router.get("/find/:id",getUser)
//GET ALL
router.get("/",verifyToken,getAllUser)
//GET USER STATS
router.get("/",verifyToken,getUserPerMonth)
module.exports = router;
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  getUserPerMonth,
} = require("../controllers/user");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/auth");
const router = require("express").Router();

//UPDATE
router.put("/:id", verifyToken, updateUser);
//DELETE
router.delete("/:id", verifyToken, deleteUser);
//GET
router.get("/info", verifyToken, getUser);
//GET ALL
router.get("/", verifyToken, verifyTokenAndAdmin, getAllUser);
//GET USER STATS
router.get("/stats", verifyToken, getUserPerMonth);
module.exports = router;

const {
  adminUpdateUser,
  deleteUser,
  getUser,
  userUpdateProfile,
  getAllUser,
  getUserPerMonth,
  uploadAvatar,
} = require("../controllers/user");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/auth");
const router = require("express").Router();

//UPDATE

router.patch("/update", verifyToken, userUpdateProfile);
//DELETE
router.delete("/delete/:id", verifyToken, verifyTokenAndAdmin, deleteUser);
//GET
router.get("/info", verifyToken, getUser);
//GET ALL
router.get("/", verifyToken, verifyTokenAndAdmin, getAllUser);
//GET USER STATS
router.get("/stats", verifyToken, getUserPerMonth);
//USER UPDATE AVATAR
router.post("/avatar", verifyToken, uploadAvatar);
module.exports = router;

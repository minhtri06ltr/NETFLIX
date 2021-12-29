const {
  register,
  login,
  activateEmail,
  getAccessToken,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { verifyToken } = require("../middlewares/auth");
const router = require("express").Router();

//register
router.post("/register", register);
//login
router.post("/login", login);
//activate
router.post("/activation", activateEmail);
//get accessToken from refreshToken
router.post("/refreshToken", getAccessToken);
router.post("/forgot", forgotPassword);
router.post("/reset", verifyToken, resetPassword);
module.exports = router;

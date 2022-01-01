const {
  register,
  login,
  activateEmail,
  getAccessToken,
  forgotPassword,
  logout,
  resetPassword,
} = require("../controllers/auth");
const {
  verifyToken,
  emailValidate,
  usernameValidate,
} = require("../middlewares/auth");
const router = require("express").Router();

//register
router.post("/register", emailValidate, usernameValidate, register);
//login
router.post("/login", login);
//activate
router.post("/activation", activateEmail);
//get accessToken from refreshToken
router.post("/refreshToken", getAccessToken);
router.post("/forgot", forgotPassword);
router.post("/reset", verifyToken, resetPassword);
router.get("/logout", logout);
module.exports = router;

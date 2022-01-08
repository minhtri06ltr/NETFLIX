const {
  register,
  login,
  activateEmail,
  getAccessToken,
  googleLogin,
  forgotPassword,
  githubLogin,
  facebookLogin,
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
router.post("/register", emailValidate, register);
//login
router.post("/login", login);
//activate
router.post("/activation", activateEmail);
//get accessToken from refreshToken
router.post("/refreshToken", getAccessToken);
router.post("/forgot", forgotPassword);
router.post("/reset", verifyToken, resetPassword);
router.get("/logout", logout);
//social login
router.post("/google_login", googleLogin);
router.post("/facebook_login", facebookLogin);
router.post("/github_login", githubLogin);
module.exports = router;

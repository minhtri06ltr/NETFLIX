const { register, login } = require("../controllers/auth");

const router = require("express").Router();

//register
router.post('/register', register);
//login
router.post('/login',login)
module.exports = router;
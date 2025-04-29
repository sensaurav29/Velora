const expess = require("express");
const router = expess.Router();
const { regiserUser, loginUser, logout } = require('../controllers/authController')

router.get("/", (req, res) => {
  res.send("hey it's working");
});

router.post("/register", regiserUser);

router.post('/login', loginUser);

router.get("/logout", logout);

module.exports = router;

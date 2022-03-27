const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = Router();

router.route("/").post(registerUser).put(protect, updateUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;

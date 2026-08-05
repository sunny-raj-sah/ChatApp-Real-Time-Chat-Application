const express = require("express");

const protect = require("../middleware/authMiddleware");
const {
  getUsers,
  searchUsers,
  getUserById,
} = require("../controllers/userController");


const router = express.Router();

router.get("/me", protect, async (req, res) => {
  res.json({
    user: req.user,
  });
});

router.get("/", protect, getUsers);

router.get("/search", protect, searchUsers);

router.get("/:id", protect, getUserById);

module.exports = router;
const User = require("../models/User");

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
    })
      .select("-password")
      .sort({ name: 1 });

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// GET /api/users/search?q=sunny
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json({
        users: [],
      });
    }

    const searchRegex = new RegExp(q.trim(), "i");

    const users = await User.find({
      _id: { $ne: req.user._id },

      $or: [
        { name: searchRegex },
        { email: searchRegex },
      ],
    })
      .select("-password")
      .limit(20);

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Search users error:", error);

    res.status(500).json({
      message: "Failed to search users",
    });
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

module.exports = {
  getUsers,
  searchUsers,
  getUserById,
};
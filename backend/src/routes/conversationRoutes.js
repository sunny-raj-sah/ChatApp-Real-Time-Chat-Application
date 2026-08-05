const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createOrGetConversation,
  getMyConversations,
} = require("../controllers/conversationController");

const router = express.Router();

router.use(protect);

router.get("/", getMyConversations);

router.post("/", createOrGetConversation);

module.exports = router;
const Conversation = require("../models/Conversation");

const createOrGetConversation = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    if (currentUserId.toString() === userId.toString()) {
      return res.status(400).json({
        message: "You cannot create a conversation with yourself",
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [currentUserId, userId],
      },
    }).populate(
      "participants",
      "-password"
    );

    if (conversation) {
      return res.status(200).json({
        conversation,
      });
    }

    conversation = await Conversation.create({
      participants: [currentUserId, userId],
    });

    conversation = await conversation.populate(
      "participants",
      "-password"
    );

    res.status(201).json({
      conversation,
    });
  } catch (error) {
    console.error(
      "Create conversation error:",
      error
    );

    res.status(500).json({
      message: "Failed to create conversation",
    });
  }
};

const getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "-password")
      .populate("lastMessage")
      .sort({
        lastMessageAt: -1,
        updatedAt: -1,
      });

    res.status(200).json({
      conversations,
    });
  } catch (error) {
    console.error(
      "Get conversations error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch conversations",
    });
  }
};

module.exports = {
  createOrGetConversation,
  getMyConversations,
};
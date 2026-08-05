 
 const ChatHeader = ({
  conversation,
  currentUser,
}) => {
  if (!conversation) {
    return (
      <div className="chat-header">
        <div>
          <h5 className="mb-0">
            Select a conversation
          </h5>
        </div>
      </div>
    );
  }

  const otherUser =
    conversation.participants.find(
      (user) =>
        user._id !== currentUser._id
    );

  return (
    <div className="chat-header">
      <div className="chat-user-avatar">
        {otherUser?.name
          ?.charAt(0)
          .toUpperCase()}
      </div>

      <div className="chat-user-info">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0">
            {otherUser?.name}
          </h5>

          <small className="text-muted">
            ({otherUser?.email})
          </small>
        </div>

        <small
          className={
            otherUser?.isOnline
              ? "text-success"
              : "text-muted"
          }
        >
          {otherUser?.isOnline
            ? "Online"
            : "Offline"}
        </small>
      </div>
    </div>
  );
};

export default ChatHeader;
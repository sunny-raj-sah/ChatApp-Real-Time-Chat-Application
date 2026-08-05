 
 const Message = ({
  message,
  currentUser,
  onDelete,
}) => {
  const isOwn =
    message.sender?._id ===
    currentUser._id;

  const handleDelete = () => {
    if (!isOwn) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    onDelete(message._id);
  };

  return (
    <div
      className={`message-row ${
        isOwn ? "own" : "other"
      }`}
    >
      <div
        className={`message-bubble ${
          isOwn ? "own" : "other"
        }`}
      >
        <div className="message-text">
          {message.text}
        </div>

        <div className="message-meta">
          <span>
            {new Date(
              message.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isOwn && (
            <span className="message-status">
              {message.status ===
                "read" && "✓✓"}

              {message.status ===
                "delivered" && "✓✓"}

              {message.status ===
                "sent" && "✓"}
            </span>
          )}

          {isOwn && (
            <button
              type="button"
              className="message-delete-btn"
              onClick={handleDelete}
              title="Delete message"
            >
              <i className="bi bi-trash" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
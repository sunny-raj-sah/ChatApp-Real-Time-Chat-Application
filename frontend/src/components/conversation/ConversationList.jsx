import ConversationItem from "./ConversationItem";

const ConversationList = ({
  conversations,
  currentUser,
  activeConversation,
  onSelect,
}) => {
  if (!conversations.length) {
    return (
      <div className="empty-conversations">
        <i className="bi bi-chat-left-text" />

        <p>
          No conversations yet
        </p>

        <small>
          Search for a user to start chatting.
        </small>
      </div>
    );
  }

  return (
    <div className="conversation-list">
      {conversations.map(
        (conversation) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
            currentUser={currentUser}
            active={
              activeConversation?._id ===
              conversation._id
            }
            onClick={() =>
              onSelect(conversation)
            }
          />
        )
      )}
    </div>
  );
};

export default ConversationList;
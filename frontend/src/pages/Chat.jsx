import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { useChat } from "../context/ChatContext";

import { getSocket } from "../services/socket";

import UserSearch from "../components/user/UserSearch";

import ConversationList from "../components/conversation/ConversationList";

import ChatHeader from "../components/chat/ChatHeader";

import MessageList from "../components/chat/MessageList";

import MessageInput from "../components/chat/MessageInput";
 
const Chat = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const {
    conversations,
    activeConversation,
    messages,
    loadingMessages,
    selectConversation,
    fetchConversations,
    sendMessage,
    startTyping,
    stopTyping,
    deleteMessage,
  } = useChat();

  useEffect(() => {
    fetchConversations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Join active conversation
  useEffect(() => {
    if (!activeConversation) {
      return;
    }

    const socket = getSocket();

    if (!socket) {
      return;
    }

    socket.emit("conversation:join", activeConversation._id);
  }, [activeConversation]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSendMessage = async (text) => {
    if (!activeConversation) {
      return;
    }

    try {
      sendMessage(activeConversation._id, text);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!user) {
    return null;
  }

  const handleTypingStart = () => {
    if (!activeConversation) {
      return;
    }

    startTyping(activeConversation._id);
  };

  const handleTypingStop = () => {
    if (!activeConversation) {
      return;
    }

    stopTyping(activeConversation._id);
  };

  const handleDeleteMessage = (messageId) => {
    try {
      deleteMessage(messageId);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };
  // return...

  return (
    <div className="chat-app">
      {/* Sidebar */}

      <aside className="chat-sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <i className="bi bi-chat-dots-fill" />

            <span>ChatApp</span>
          </div>

          <div className="current-user">
            <div className="current-user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="current-user-info">
              <strong>{user?.name}</strong>

              <small>({user?.email})</small>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={handleLogout}
              title="Logout"
            >
              <i className="bi bi-box-arrow-right" />
            </button>
          </div>
        </div>

        <UserSearch />

        <ConversationList
          conversations={conversations}
          currentUser={user}
          activeConversation={activeConversation}
          onSelect={selectConversation}
        />
      </aside>

      {/* Chat */}

      <main className="chat-main">
        <ChatHeader conversation={activeConversation} currentUser={user} />

        {activeConversation ? (
          <>
            <MessageList
              messages={messages}
              currentUser={user}
              loading={loadingMessages}
              onDelete={handleDeleteMessage}
            />

            <MessageInput
              onSend={handleSendMessage}
              onTypingStart={handleTypingStart}
              onTypingStop={handleTypingStop}
            />
          </>
        ) : (
          <div className="empty-chat">
            <i className="bi bi-chat-square-heart" />

            <h3>Start a conversation</h3>

            <p>Search for a user and start chatting.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;

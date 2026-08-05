// const ConversationItem = ({
//   conversation,
//   currentUser,
//   active,
//   onClick,
// }) => {
//   const otherUser =
//     conversation.participants.find(
//       (user) =>
//         user._id !== currentUser._id
//     );

//   return (
//     <button
//       type="button"
//       className={`conversation-item ${
//         active ? "active" : ""
//       }`}
//       onClick={onClick}
//     >
//       <div className="conversation-avatar">
//         {otherUser?.name
//           ?.charAt(0)
//           .toUpperCase()}
//       </div>

//       <div className="conversation-content">
//         <div className="conversation-top">
//           <strong>
//             {otherUser?.name}
//           </strong>

//           {conversation.lastMessageAt && (
//             <small>
//               {new Date(
//                 conversation.lastMessageAt
//               ).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </small>
//           )}
//         </div>

//         <div className="conversation-preview">
//           {conversation.lastMessage
//             ?.text || "No messages yet"}
//         </div>
//       </div>
//     </button>
//   );
// };

// export default ConversationItem;

// -------------------------------------------
import { useEffect, useState } from "react";

import {
  subscribeToSocket,
} from "../../services/socket";

const ConversationItem = ({
  conversation,
  currentUser,
  active,
  onClick,
}) => {
  const [isTyping, setIsTyping] =
    useState(false);

  const otherUser =
    conversation.participants.find(
      (user) =>
        user._id !== currentUser._id
    );

  // --------------------------------
  // Listen for typing events
  // --------------------------------

  useEffect(() => {
    const handleSocket = (socket) => {
      const handleTypingStart = ({
        conversationId,
        userId,
      }) => {
        // Only show typing for this conversation
        if (
          conversationId !==
          conversation._id
        ) {
          return;
        }

        // Don't show our own typing
        if (
          userId === currentUser._id
        ) {
          return;
        }

        setIsTyping(true);
      };

      const handleTypingStop = ({
        conversationId,
        userId,
      }) => {
        if (
          conversationId !==
          conversation._id
        ) {
          return;
        }

        if (
          userId === currentUser._id
        ) {
          return;
        }

        setIsTyping(false);
      };

      socket.on(
        "typing:start",
        handleTypingStart
      );

      socket.on(
        "typing:stop",
        handleTypingStop
      );

      return () => {
        socket.off(
          "typing:start",
          handleTypingStart
        );

        socket.off(
          "typing:stop",
          handleTypingStop
        );
      };
    };

    const unsubscribe =
      subscribeToSocket(
        handleSocket
      );

    return () => {
      unsubscribe();
    };
  }, [
    conversation._id,
    currentUser._id,
  ]);

  return (
    <button
      type="button"
      className={`conversation-item ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      <div className="conversation-avatar">
        {otherUser?.name
          ?.charAt(0)
          .toUpperCase()}
      </div>

      <div className="conversation-content">
        <div className="conversation-top">
          <strong>
            {otherUser?.name}
          </strong>

          {conversation.lastMessageAt && (
            <small>
              {new Date(
                conversation.lastMessageAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          )}
        </div>

        <div className="conversation-preview">
          {isTyping ? (
            <span className="typing-text">
              Typing...
            </span>
          ) : (
            conversation.lastMessage
              ?.text || "No messages yet"
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;
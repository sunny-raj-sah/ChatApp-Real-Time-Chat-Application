// // const ConversationItem = ({
// //   conversation,
// //   currentUser,
// //   active,
// //   onClick,
// // }) => {
// //   const otherUser =
// //     conversation.participants.find(
// //       (user) =>
// //         user._id !== currentUser._id
// //     );

// //   return (
// //     <button
// //       type="button"
// //       className={`conversation-item ${
// //         active ? "active" : ""
// //       }`}
// //       onClick={onClick}
// //     >
// //       <div className="conversation-avatar">
// //         {otherUser?.name
// //           ?.charAt(0)
// //           .toUpperCase()}
// //       </div>

// //       <div className="conversation-content">
// //         <div className="conversation-top">
// //           <strong>
// //             {otherUser?.name}
// //           </strong>

// //           {conversation.lastMessageAt && (
// //             <small>
// //               {new Date(
// //                 conversation.lastMessageAt
// //               ).toLocaleTimeString([], {
// //                 hour: "2-digit",
// //                 minute: "2-digit",
// //               })}
// //             </small>
// //           )}
// //         </div>

// //         <div className="conversation-preview">
// //           {conversation.lastMessage
// //             ?.text || "No messages yet"}
// //         </div>
// //       </div>
// //     </button>
// //   );
// // };

// // export default ConversationItem;

// // -------------------------------------------
// import { useEffect, useState } from "react";

// import {
//   subscribeToSocket,
// } from "../../services/socket";

// const ConversationItem = ({
//   conversation,
//   currentUser,
//   active,
//   onClick,
// }) => {
//   const [isTyping, setIsTyping] =
//     useState(false);

//   const otherUser =
//     conversation.participants.find(
//       (user) =>
//         user._id !== currentUser._id
//     );

//   // --------------------------------
//   // Listen for typing events
//   // --------------------------------

//   useEffect(() => {
//     const handleSocket = (socket) => {
//       const handleTypingStart = ({
//         conversationId,
//         userId,
//       }) => {
//         // Only show typing for this conversation
//         if (
//           conversationId !==
//           conversation._id
//         ) {
//           return;
//         }

//         // Don't show our own typing
//         if (
//           userId === currentUser._id
//         ) {
//           return;
//         }

//         setIsTyping(true);
//       };

//       const handleTypingStop = ({
//         conversationId,
//         userId,
//       }) => {
//         if (
//           conversationId !==
//           conversation._id
//         ) {
//           return;
//         }

//         if (
//           userId === currentUser._id
//         ) {
//           return;
//         }

//         setIsTyping(false);
//       };

//       socket.on(
//         "typing:start",
//         handleTypingStart
//       );

//       socket.on(
//         "typing:stop",
//         handleTypingStop
//       );

//       return () => {
//         socket.off(
//           "typing:start",
//           handleTypingStart
//         );

//         socket.off(
//           "typing:stop",
//           handleTypingStop
//         );
//       };
//     };

//     const unsubscribe =
//       subscribeToSocket(
//         handleSocket
//       );

//     return () => {
//       unsubscribe();
//     };
//   }, [
//     conversation._id,
//     currentUser._id,
//   ]);

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
//           {isTyping ? (
//             <span className="typing-text">
//               Typing...
//             </span>
//           ) : (
//             conversation.lastMessage
//               ?.text || "No messages yet"
//           )}
//         </div>
//       </div>
//     </button>

   
// // <button
// //   type="button"
// //   className={`
// //     btn
// //     w-100
// //     text-start
// //     border-0
// //     rounded-0
// //     p-2
// //     p-md-3
// //     d-flex
// //     align-items-center
// //     gap-2
// //     gap-md-3
// //     ${active ? "bg-primary bg-opacity-10" : "bg-white"}
// //   `}
// //   onClick={onClick}
// // >
// //   {/* Avatar */}
// //   <div
// //     className="
// //       bg-primary
// //       text-white
// //       rounded-circle
// //       d-flex
// //       align-items-center
// //       justify-content-center
// //       flex-shrink-0
// //       fw-semibold
// //     "
// //     style={{
// //       width: "44px",
// //       height: "44px",
// //       fontSize: "16px",
// //     }}
// //   >
// //     {otherUser?.name
// //       ?.charAt(0)
// //       .toUpperCase()}
// //   </div>

// //   {/* Conversation Content */}
// //   <div
// //     className="
// //       flex-grow-1
// //       min-width-0
// //       overflow-hidden
// //     "
// //   >
// //     {/* Name + Time */}
// //     <div className="d-flex align-items-center justify-content-between gap-2">
// //       <strong className="text-dark text-truncate">
// //         {otherUser?.name}
// //       </strong>

// //       {conversation.lastMessageAt && (
// //         <small className="text-muted text-nowrap flex-shrink-0">
// //           {new Date(
// //             conversation.lastMessageAt
// //           ).toLocaleTimeString([], {
// //             hour: "2-digit",
// //             minute: "2-digit",
// //           })}
// //         </small>
// //       )}
// //     </div>

// //     {/* Last Message */}
// //     <div className="mt-1">
// //       {isTyping ? (
// //         <span className="text-primary fw-medium">
// //           Typing...
// //         </span>
// //       ) : (
// //         <small className="text-muted text-truncate d-block">
// //           {conversation.lastMessage?.text ||
// //             "No messages yet"}
// //         </small>
// //       )}
// //     </div>
// //   </div>
// // </button>


//   );
// };

// export default ConversationItem;

// ------------------------------------------------------------------

import { useEffect, useState } from "react";

import { subscribeToSocket } from "../../services/socket";

const ConversationItem = ({ conversation, currentUser, active, onClick }) => {
  const [isTyping, setIsTyping] = useState(false);

  const otherUser = conversation.participants.find(
    (user) => user._id !== currentUser._id
  );

  // --------------------------------
  // Listen for typing events
  // --------------------------------

  useEffect(() => {
    const handleSocket = (socket) => {
      const handleTypingStart = ({ conversationId, userId }) => {
        // Only show typing for this conversation
        if (conversationId !== conversation._id) {
          return;
        }

        // Don't show our own typing
        if (userId === currentUser._id) {
          return;
        }

        setIsTyping(true);
      };

      const handleTypingStop = ({ conversationId, userId }) => {
        if (conversationId !== conversation._id) {
          return;
        }

        if (userId === currentUser._id) {
          return;
        }

        setIsTyping(false);
      };

      socket.on("typing:start", handleTypingStart);
      socket.on("typing:stop", handleTypingStop);

      return () => {
        socket.off("typing:start", handleTypingStart);
        socket.off("typing:stop", handleTypingStop);
      };
    };

    const unsubscribe = subscribeToSocket(handleSocket);

    return () => {
      unsubscribe();
    };
  }, [conversation._id, currentUser._id]);

  return (
    <button
      type="button"
      className={`cw-conv-item cw-focusable btn w-100 text-start border-0 rounded-0 p-2 p-md-3 d-flex align-items-center gap-2 gap-md-3 ${
        active ? "is-active" : ""
      }`}
      onClick={onClick}
    >
      {/* Avatar */}
      <div
        className={`cw-avatar cw-avatar-ring ${
          otherUser?.isOnline ? "is-online" : ""
        }`}
        style={{ width: "44px", height: "44px", fontSize: "16px" }}
      >
        {otherUser?.name?.charAt(0).toUpperCase()}
      </div>

      {/* Conversation Content */}
      <div className="flex-grow-1 min-width-0 overflow-hidden">
        {/* Name + Time */}
        <div className="d-flex align-items-center justify-content-between gap-2">
          <strong className="text-truncate" style={{ color: "var(--cw-ink)" }}>
            {otherUser?.name}
          </strong>

          {conversation.lastMessageAt && (
            <small className="text-muted text-nowrap flex-shrink-0">
              {new Date(conversation.lastMessageAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          )}
        </div>

        {/* Last Message */}
        <div className="mt-1">
          {isTyping ? (
            <span className="cw-typing-label small">
              typing
              <span className="cw-typing-dots">
                <span />
                <span />
                <span />
              </span>
            </span>
          ) : (
            <small className="text-muted text-truncate d-block">
              {conversation.lastMessage?.text || "No messages yet"}
            </small>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;

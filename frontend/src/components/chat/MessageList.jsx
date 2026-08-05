// import {
//   useEffect,
//   useRef,
// } from "react";

// import Message from "./Message";

// const MessageList = ({
//   messages,
//   currentUser,
//   loading,
//     onDelete,
// }) => {
//   const bottomRef =
//     useRef(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   if (loading) {
//     return (
//       <div className="message-list message-loading">
//         Loading messages...
//       </div>
//     );
//   }

//   return (
//     <div className="message-list">
//       {messages.length === 0 ? (
//         <div className="empty-messages">
//           <i className="bi bi-chat-heart" />

//           <h5>
//             No messages yet
//           </h5>

//           <p>
//             Send a message to start the
//             conversation.
//           </p>
//         </div>
//       ) : (
//         messages.map((message) => (
//           // <Message
//           //   key={message._id}
//           //   message={message}
//           //   currentUser={currentUser}
//           //      
//           // />
//           <Message
//   key={message._id}
//   message={message}
//   currentUser={currentUser}
//   onDelete={onDelete}
// />
//         ))
//       )}

//       <div ref={bottomRef} />
//     </div>
//   );
// };

// export default MessageList;

// ------------------------------------------------------------------

import {
  useEffect,
  useRef,
} from "react";

import Message from "./Message";

const MessageList = ({
  messages,
  currentUser,
  loading,
  onDelete,
}) => {
  const bottomRef =
    useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (loading) {
    return (
      <div className="message-list message-loading">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-messages">
          <i className="bi bi-chat-heart" />

          <h5>
            No messages yet
          </h5>

          <p>
            Send a message to start the
            conversation.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            currentUser={currentUser}
            onDelete={onDelete}
          />
        ))
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
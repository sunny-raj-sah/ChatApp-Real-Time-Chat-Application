// import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// import { useAuth } from "../context/AuthContext";

// import { useChat } from "../context/ChatContext";

// import { getSocket } from "../services/socket";

// import UserSearch from "../components/user/UserSearch";

// import ConversationList from "../components/conversation/ConversationList";

// import ChatHeader from "../components/chat/ChatHeader";

// import MessageList from "../components/chat/MessageList";

// import MessageInput from "../components/chat/MessageInput";
 
// const Chat = () => {
//   const navigate = useNavigate();

//   const { user, logout } = useAuth();

//   const {
//     conversations,
//     activeConversation,
//     messages,
//     loadingMessages,
//     selectConversation,
//     // fetchConversations,
//     sendMessage,
//     startTyping,
//     stopTyping,
//     deleteMessage,
//   } = useChat();

//   // useEffect(() => {
//   //   fetchConversations();

//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   // Join active conversation
//   useEffect(() => {
//     if (!activeConversation) {
//       return;
//     }

//     const socket = getSocket();

//     if (!socket) {
//       return;
//     }

//     socket.emit("conversation:join", activeConversation._id);
//   }, [activeConversation]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleSendMessage = async (text) => {
//     if (!activeConversation) {
//       return;
//     }

//     try {
//       sendMessage(activeConversation._id, text);
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   if (!user) {
//     return null;
//   }

//   const handleTypingStart = () => {
//     if (!activeConversation) {
//       return;
//     }

//     startTyping(activeConversation._id);
//   };

//   const handleTypingStop = () => {
//     if (!activeConversation) {
//       return;
//     }

//     stopTyping(activeConversation._id);
//   };

//   const handleDeleteMessage = (messageId) => {
//     try {
//       deleteMessage(messageId);
//     } catch (error) {
//       console.error("Failed to delete message:", error);
//     }
//   };
//   // return...

//   return (
//      <div className="container-fluid vh-100 p-0 overflow-hidden">
//   <div className="row g-0 h-100">

//     {/* Sidebar */}
//     <aside
//       className="
//         col-12 col-md-5 col-lg-4 col-xl-3
//         d-flex flex-column
//         border-end
//         bg-white
//       "
//     >
//       <div className="p-3 border-bottom">

//         {/* Brand */}
//         <div className="d-flex align-items-center gap-2 mb-3">
//           <i className="bi bi-chat-dots-fill fs-4"></i>

//           <span className="fw-bold fs-5">
//             ChatApp
//           </span>
//         </div>

//         {/* Current User */}
//         <div className="d-flex align-items-center gap-2">

//           <div
//             className="
//               bg-primary
//               text-white
//               rounded-circle
//               d-flex
//               align-items-center
//               justify-content-center
//               flex-shrink-0
//             "
//             style={{
//               width: "42px",
//               height: "42px",
//             }}
//           >
//             {user?.name?.charAt(0).toUpperCase()}
//           </div>

//           <div className="flex-grow-1 overflow-hidden">
//             <strong className="d-block text-truncate">
//               {user?.name}
//             </strong>

//             <small className="text-muted d-block text-truncate">
//               {user?.email}
//             </small>
//           </div>

//           <button
//             type="button"
//             className="btn btn-sm btn-light flex-shrink-0"
//             onClick={handleLogout}
//             title="Logout"
//           >
//             <i className="bi bi-box-arrow-right"></i>
//           </button>

//         </div>
//       </div>

//       {/* Search */}
//       <UserSearch />

//       {/* Conversations */}
//       <div className="flex-grow-1 overflow-auto">
//         <ConversationList
//           conversations={conversations}
//           currentUser={user}
//           activeConversation={activeConversation}
//           onSelect={selectConversation}
//         />
//       </div>
//     </aside>


//     {/* Chat */}
//     <main
//       className="
//         col-12 col-md-7 col-lg-8 col-xl-9
//         d-flex
//         flex-column
//         bg-light
//         min-vh-0
//       "
//     >
//       <ChatHeader
//         conversation={activeConversation}
//         currentUser={user}
//       />

//       {activeConversation ? (
//         <>
//           <div className="flex-grow-1 overflow-auto">
//             <MessageList
//               messages={messages}
//               currentUser={user}
//               loading={loadingMessages}
//               onDelete={handleDeleteMessage}
//             />
//           </div>

//           <div className="flex-shrink-0">
//             <MessageInput
//               onSend={handleSendMessage}
//               onTypingStart={handleTypingStart}
//               onTypingStop={handleTypingStop}
//             />
//           </div>
//         </>
//       ) : (
//         <div className="flex-grow-1 d-flex align-items-center justify-content-center text-center p-4">
//           <div>
//             <i className="bi bi-chat-square-heart display-1 text-primary"></i>

//             <h3 className="mt-3">
//               Start a conversation
//             </h3>

//             <p className="text-muted mb-0">
//               Search for a user and start chatting.
//             </p>
//           </div>
//         </div>
//       )}
//     </main>

//   </div>
// </div>
//   );
// };

// export default Chat;
// ---------------------------------------------------------------------

 import { useEffect, useState } from "react";
 
 import { useNavigate } from "react-router-dom";
 
 import { useAuth } from "../context/AuthContext";
 
 import { useChat } from "../context/ChatContext";
 
 import { getSocket } from "../services/socket";
 
 import UserSearch from "../components/user/UserSearch";
 
 import ConversationList from "../components/conversation/ConversationList";
 
 import ChatHeader from "../components/chat/ChatHeader";
 
 import MessageList from "../components/chat/MessageList";
 
 import MessageInput from "../components/chat/MessageInput";
 
 import "../chat-theme.css";
 
 const Chat = () => {
   const navigate = useNavigate();
 
   const { user, logout } = useAuth();
 
   const {
     conversations,
     activeConversation,
     messages,
     loadingMessages,
     selectConversation,
     sendMessage,
     startTyping,
     stopTyping,
     deleteMessage,
   } = useChat();
 
   // Which pane is showing on a small (< md) screen: the
   // conversation list, or the open thread. Desktop always
   // shows both, this only matters below the md breakpoint.
   const [mobileView, setMobileView] = useState("list");
 
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
 
   const handleSelectConversation = (conversation) => {
     selectConversation(conversation);
     setMobileView("chat");
   };
 
   const handleBackToList = () => {
     setMobileView("list");
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
 
   return (
     <div className="cw-shell d-flex flex-column vh-100 overflow-hidden">
       {/* Top bar — brand + current user + logout.
           Always visible, on every screen size, regardless of
           which conversation (if any) is open. */}
       <div className="cw-topbar d-flex align-items-center gap-2 gap-md-3 px-3 py-2">
         <div className="cw-brand-mark">
           <i className="bi bi-chat-dots-fill"></i>
         </div>
 
         <span className="cw-brand-word d-none d-sm-inline">Chat</span>
 
         <div className="flex-grow-1" />
 
         <div className="d-flex align-items-center gap-2">
           <div
             className="cw-avatar flex-shrink-0"
             style={{ width: "38px", height: "38px", fontSize: "14px" }}
           >
             {user?.name?.charAt(0).toUpperCase()}
           </div>
 
           <div className="d-none d-sm-block overflow-hidden" style={{ maxWidth: "160px" }}>
             <strong
               className="d-block text-truncate small"
               style={{ color: "var(--cw-ink)" }}
             >
               {user?.name}
             </strong>
 
             <small className="text-muted d-block text-truncate">
               {user?.email}
             </small>
           </div>
 
           <button
             type="button"
             className="cw-icon-btn cw-focusable flex-shrink-0"
             onClick={handleLogout}
             title="Logout"
           >
             <i className="bi bi-box-arrow-right"></i>
           </button>
         </div>
       </div>
 
       {/* Sidebar + chat.
           minHeight: 0 is required here (not a Bootstrap class —
           "min-vh-0" isn't real) so these flex children can shrink
           to the viewport instead of growing past it and dragging
           the top bar out of view when a thread has a lot of messages. */}
       <div className="row g-0 flex-grow-1" style={{ minHeight: 0 }}>
         {/* Sidebar — conversation list. Full-screen on mobile
             until a conversation is opened, always visible on md+ */}
         <aside
           className={`cw-sidebar col-12 col-md-5 col-lg-4 col-xl-3 flex-column border-end h-100 ${
             mobileView === "chat" ? "d-none d-md-flex" : "d-flex"
           }`}
           style={{ minHeight: 0 }}
         >
           {/* Search */}
           <UserSearch />
 
           {/* Conversations */}
           <div className="cw-scroll flex-grow-1 overflow-auto">
             <ConversationList
               conversations={conversations}
               currentUser={user}
               activeConversation={activeConversation}
               onSelect={handleSelectConversation}
             />
           </div>
         </aside>
 
         {/* Chat — open thread. Full-screen on mobile once a
             conversation is opened, always visible on md+ */}
         <main
           className={`col-12 col-md-7 col-lg-8 col-xl-9 flex-column h-100 ${
             mobileView === "list" ? "d-none d-md-flex" : "d-flex"
           }`}
           style={{ minHeight: 0 }}
         >
           <ChatHeader
             conversation={activeConversation}
             currentUser={user}
             onBack={handleBackToList}
           />
 
           {activeConversation ? (
             <>
               <MessageList
                 messages={messages}
                 currentUser={user}
                 loading={loadingMessages}
                 onDelete={handleDeleteMessage}
               />
 
               <div className="flex-shrink-0">
                 <MessageInput
                   onSend={handleSendMessage}
                   onTypingStart={handleTypingStart}
                   onTypingStop={handleTypingStop}
                 />
               </div>
             </>
           ) : (
             <div className="cw-message-pane flex-grow-1 d-flex align-items-center justify-content-center text-center p-4">
               <div>
                 <div
                   className="cw-empty-badge"
                   style={{ width: "104px", height: "104px" }}
                 >
                   <i className="bi bi-chat-square-heart" style={{ fontSize: "2.5rem" }}></i>
                 </div>
 
                 <h3 className="mt-3 cw-display">Start a conversation</h3>
 
                 <p className="text-muted mb-0">
                   Search for a user and start chatting.
                 </p>
               </div>
             </div>
           )}
         </main>
       </div>
     </div>
   );
 };
 
 export default Chat;
 
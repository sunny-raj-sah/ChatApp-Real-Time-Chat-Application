 
// // //  const ChatHeader = ({
// // //   conversation,
// // //   currentUser,
// // // }) => {
// // //   if (!conversation) {
// // //     return (
// // //       <div className="chat-header">
// // //         <div>
// // //           <h5 className="mb-0">
// // //             Select a conversation
// // //           </h5>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const otherUser =
// // //     conversation.participants.find(
// // //       (user) =>
// // //         user._id !== currentUser._id
// // //     );

// // //   return (
// // //     <div className="chat-header">
// // //       <div className="chat-user-avatar">
// // //         {otherUser?.name
// // //           ?.charAt(0)
// // //           .toUpperCase()}
// // //       </div>

// // //       <div className="chat-user-info">
// // //         <div className="d-flex align-items-center gap-2">
// // //           <h5 className="mb-0">
// // //             {otherUser?.name}
// // //           </h5>

// // //           <small className="text-muted">
// // //             ({otherUser?.email})
// // //           </small>
// // //         </div>

// // //         <small
// // //           className={
// // //             otherUser?.isOnline
// // //               ? "text-success"
// // //               : "text-muted"
// // //           }
// // //         >
// // //           {otherUser?.isOnline
// // //             ? "Online"
// // //             : "Offline"}
// // //         </small>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ChatHeader;

// // // ----------------------------------------------------

 
// // const ChatHeader = ({
// //   conversation,
// //   currentUser,
// // }) => {
// //   if (!conversation) {
// //     return (
// //       <div className="bg-white border-bottom px-3 px-md-4 py-3">
// //         <div className="d-flex align-items-center">
// //           <div>
// //             <h5 className="mb-0 fw-semibold text-dark">
// //               Select a conversation
// //             </h5>

// //             <small className="text-muted">
// //               Choose a conversation to start chatting
// //             </small>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const otherUser =
// //     conversation.participants.find(
// //       (user) =>
// //         user._id !== currentUser._id
// //     );

// //   return (
// //     <div className="bg-white border-bottom px-3 px-md-4 py-2 py-md-3">
// //       <div className="d-flex align-items-center gap-2 gap-md-3">

// //         {/* User Avatar */}
// //         <div
// //           className="
// //             bg-primary
// //             text-white
// //             rounded-circle
// //             d-flex
// //             align-items-center
// //             justify-content-center
// //             flex-shrink-0
// //             fw-semibold
// //           "
// //           style={{
// //             width: "44px",
// //             height: "44px",
// //             fontSize: "17px",
// //           }}
// //         >
// //           {otherUser?.name
// //             ?.charAt(0)
// //             .toUpperCase()}
// //         </div>

// //         {/* User Information */}
// //         <div className="flex-grow-1 overflow-hidden">

// //           {/* Name + Email */}
// //           <div className="d-flex align-items-center gap-2">

// //             <h5 className="mb-0 fw-semibold text-dark text-truncate">
// //               {otherUser?.name}
// //             </h5>

// //             <small className="text-muted text-truncate d-none d-md-block">
// //               ({otherUser?.email})
// //             </small>

// //           </div>

// //           {/* Online Status */}
// //           <div className="d-flex align-items-center gap-1 mt-1">

// //             <span
// //               className={`rounded-circle ${
// //                 otherUser?.isOnline
// //                   ? "bg-success"
// //                   : "bg-secondary"
// //               }`}
// //               style={{
// //                 width: "8px",
// //                 height: "8px",
// //               }}
// //             />

// //             <small
// //               className={
// //                 otherUser?.isOnline
// //                   ? "text-success fw-medium"
// //                   : "text-muted"
// //               }
// //             >
// //               {otherUser?.isOnline
// //                 ? "Online"
// //                 : "Offline"}
// //             </small>

// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatHeader;
// //  --------------------------------------------------------------


// const ChatHeader = ({ conversation, currentUser, onBack }) => {
//   if (!conversation) {
//     return (
//       <div className="cw-header px-3 px-md-4 py-3">
//         <div className="d-flex align-items-center gap-2">
//           {onBack && (
//             <button
//               type="button"
//               className="cw-back-btn cw-focusable d-md-none"
//               onClick={onBack}
//               title="Back to conversations"
//             >
//               <i className="bi bi-arrow-left" />
//             </button>
//           )}

//           <div>
//             <h5 className="mb-0 fw-semibold cw-display">
//               Select a conversation
//             </h5>

//             <small className="text-muted">
//               Choose a conversation to start chatting
//             </small>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const otherUser = conversation.participants.find(
//     (user) => user._id !== currentUser._id
//   );

//   return (
//     <div className="cw-header px-3 px-md-4 py-2 py-md-3">
//       <div className="d-flex align-items-center gap-2 gap-md-3">
//         {/* Back to list (mobile only) */}
//         {onBack && (
//           <button
//             type="button"
//             className="cw-back-btn cw-focusable d-md-none"
//             onClick={onBack}
//             title="Back to conversations"
//           >
//             <i className="bi bi-arrow-left" />
//           </button>
//         )}

//         {/* User Avatar */}
//         <div
//           className={`cw-avatar cw-avatar-ring ${
//             otherUser?.isOnline ? "is-online" : ""
//           }`}
//           style={{ width: "44px", height: "44px", fontSize: "17px" }}
//         >
//           {otherUser?.name?.charAt(0).toUpperCase()}
//         </div>

//         {/* User Information */}
//         <div className="flex-grow-1 overflow-hidden">
//           {/* Name + Email */}
//           <div className="d-flex align-items-center gap-2">
//             <h5 className="mb-0 fw-semibold cw-display text-truncate">
//               {otherUser?.name}
//             </h5>

//             <small className="text-muted text-truncate d-none d-md-block">
//               ({otherUser?.email})
//             </small>
//           </div>

//           {/* Online Status */}
//           <div className="d-flex align-items-center gap-1 mt-1">
//             <span
//               className={`cw-status-dot ${
//                 otherUser?.isOnline ? "is-online" : ""
//               }`}
//             />

//             <small
//               className={
//                 otherUser?.isOnline
//                   ? "fw-medium"
//                   : "text-muted"
//               }
//               style={
//                 otherUser?.isOnline
//                   ? { color: "var(--cw-primary)" }
//                   : undefined
//               }
//             >
//               {otherUser?.isOnline ? "Online" : "Offline"}
//             </small>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;



const ChatHeader = ({ conversation, currentUser, onBack }) => {
  if (!conversation) {
    return (
      <div className="cw-header px-3 px-md-4 py-3">
        <div className="d-flex align-items-center gap-2">
          {onBack && (
            <button
              type="button"
              className="cw-back-btn cw-focusable d-md-none"
              onClick={onBack}
              title="Back to conversations"
            >
              <i className="bi bi-arrow-left" />
            </button>
          )}

          <div>
            <h5 className="mb-0 fw-semibold cw-display">
              Select a conversation
            </h5>

            <small className="text-muted">
              Choose a conversation to start chatting
            </small>
          </div>
        </div>
      </div>
    );
  }

  const otherUser = conversation.participants.find(
    (user) => String(user._id) !== String(currentUser._id)
  );

  return (
    <div className="cw-header px-3 px-md-4 py-2 py-md-3">
      <div className="d-flex align-items-center gap-2 gap-md-3">
        {/* Back to list (mobile only) */}
        {onBack && (
          <button
            type="button"
            className="cw-back-btn cw-focusable d-md-none"
            onClick={onBack}
            title="Back to conversations"
          >
            <i className="bi bi-arrow-left" />
          </button>
        )}

        {/* User Avatar */}
        <div
          className={`cw-avatar cw-avatar-ring ${
            otherUser?.isOnline ? "is-online" : ""
          }`}
          style={{ width: "44px", height: "44px", fontSize: "17px" }}
        >
          {otherUser?.name?.charAt(0).toUpperCase()}
        </div>

        {/* User Information */}
        <div className="flex-grow-1 overflow-hidden">
          {/* Name + Email */}
          <div className="d-flex align-items-center gap-2">
            <h5 className="mb-0 fw-semibold cw-display text-truncate">
              {otherUser?.name}
            </h5>

            <small className="text-muted text-truncate d-none d-md-block">
              ({otherUser?.email})
            </small>
          </div>

          {/* Online Status */}
          <div className="d-flex align-items-center gap-1 mt-1">
            <span
              className={`cw-status-dot ${
                otherUser?.isOnline ? "is-online" : ""
              }`}
            />

            <small
              className={
                otherUser?.isOnline
                  ? "fw-medium"
                  : "text-muted"
              }
              style={
                otherUser?.isOnline
                  ? { color: "var(--cw-primary)" }
                  : undefined
              }
            >
              {otherUser?.isOnline ? "Online" : "Offline"}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

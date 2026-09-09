  
// // import {
// //   useEffect,
// //   useRef,
// //   useState,
// // } from "react";

// // const MessageInput = ({
// //   disabled,
// //   onSend,
// //   onTypingStart,
// //   onTypingStop,
// // }) => {
// //   const [text, setText] =
// //     useState("");

// //   const typingTimeoutRef =
// //     useRef(null);

// //   const isTypingRef =
// //     useRef(false);

// //   // --------------------------------
// //   // Cleanup typing timeout
// //   // --------------------------------

// //   useEffect(() => {
// //     return () => {
// //       if (
// //         typingTimeoutRef.current
// //       ) {
// //         clearTimeout(
// //           typingTimeoutRef.current
// //         );
// //       }

// //       if (
// //         isTypingRef.current
// //       ) {
// //         onTypingStop?.();

// //         isTypingRef.current =
// //           false;
// //       }
// //     };
// //   }, [onTypingStop]);

// //   // --------------------------------
// //   // Handle typing
// //   // --------------------------------

// //   const handleChange = (
// //     event
// //   ) => {
// //     const value =
// //       event.target.value;

// //     setText(value);

// //     if (!value.trim()) {
// //       if (
// //         isTypingRef.current
// //       ) {
// //         onTypingStop?.();

// //         isTypingRef.current =
// //           false;
// //       }

// //       if (
// //         typingTimeoutRef.current
// //       ) {
// //         clearTimeout(
// //           typingTimeoutRef.current
// //         );
// //       }

// //       return;
// //     }

// //     // Start typing
// //     if (
// //       !isTypingRef.current
// //     ) {
// //       onTypingStart?.();

// //       isTypingRef.current =
// //         true;
// //     }

// //     // Reset timeout
// //     if (
// //       typingTimeoutRef.current
// //     ) {
// //       clearTimeout(
// //         typingTimeoutRef.current
// //       );
// //     }

// //     typingTimeoutRef.current =
// //       setTimeout(() => {
// //         onTypingStop?.();

// //         isTypingRef.current =
// //           false;
// //       }, 1200);
// //   };

// //   // --------------------------------
// //   // Submit
// //   // --------------------------------

// //   const handleSubmit = async (
// //     event
// //   ) => {
// //     event.preventDefault();

// //     if (!text.trim()) {
// //       return;
// //     }

// //     if (
// //       typingTimeoutRef.current
// //     ) {
// //       clearTimeout(
// //         typingTimeoutRef.current
// //       );
// //     }

// //     if (
// //       isTypingRef.current
// //     ) {
// //       onTypingStop?.();

// //       isTypingRef.current =
// //         false;
// //     }

// //     await onSend(
// //       text.trim()
// //     );

// //     setText("");
// //   };

// //   return (
// //     <form
// //       className="message-input"
// //       onSubmit={handleSubmit}
// //     >
// //       <input
// //         type="text"
// //         placeholder="Type a message..."
// //         value={text}
// //         onChange={handleChange}
// //         disabled={disabled}
// //       />

// //       <button
// //         type="submit"
// //         className="btn btn-primary"
// //         disabled={
// //           disabled ||
// //           !text.trim()
// //         }
// //       >
// //         <i className="bi bi-send-fill" />
// //       </button>
// //     </form>
// //   );
// // };

// // export default MessageInput;


// // ---------------------------------------
// import { useEffect, useRef, useState } from "react";

// import EmojiPicker from "emoji-picker-react";

// const MessageInput = ({
//   disabled,
//   onSend,
//   onTypingStart,
//   onTypingStop,
// }) => {
//   const [text, setText] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] =
//     useState(false);

//   const emojiPickerRef = useRef(null);

//   // --------------------------------
//   // Close emoji picker when clicking outside
//   // --------------------------------

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(event.target)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//     };
//   }, []);

//   // --------------------------------
//   // Handle input change
//   // --------------------------------

//   const handleChange = (event) => {
//     const value = event.target.value;

//     setText(value);

//     if (value.trim()) {
//       onTypingStart?.();
//     } else {
//       onTypingStop?.();
//     }
//   };

//   // --------------------------------
//   // Add emoji to message
//   // --------------------------------

//   const handleEmojiClick = (emojiData) => {
//     setText((previous) => {
//       return previous + emojiData.emoji;
//     });

//     onTypingStart?.();
//   };

//   // --------------------------------
//   // Send message
//   // --------------------------------

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!text.trim()) {
//       return;
//     }

//     try {
//       await onSend(text.trim());

//       setText("");
//       setShowEmojiPicker(false);

//       onTypingStop?.();
//     } catch (error) {
//       console.error(
//         "Failed to send message:",
//         error
//       );
//     }
//   };

//   // --------------------------------
//   // Handle Enter key
//   // --------------------------------

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();

//       if (text.trim()) {
//         event.currentTarget.form?.requestSubmit();
//       }
//     }
//   };

//   return (
//     <form
//       className="message-input"
//       onSubmit={handleSubmit}
//     >
//       {/* Emoji Picker */}

//       <div
//         className="emoji-picker-wrapper"
//         ref={emojiPickerRef}
//       >
//         <button
//           type="button"
//           className="emoji-button"
//           onClick={() =>
//             setShowEmojiPicker(
//               (previous) => !previous
//             )
//           }
//           disabled={disabled}
//           title="Add emoji"
//         >
//           <i className="bi bi-emoji-smile" />
//         </button>

//         {showEmojiPicker && (
//           <div className="emoji-picker-container">
//             <EmojiPicker
//               onEmojiClick={handleEmojiClick}
//               width={320}
//               height={400}
//               searchDisabled={false}
//               skinTonesDisabled={false}
//               previewConfig={{
//                 showPreview: false,
//               }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Message Input */}

//       <input
//         type="text"
//         placeholder="Type a message..."
//         value={text}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         disabled={disabled}
//       />

//       {/* Send Button */}

//       <button
//         type="submit"
//         className="btn btn-primary"
//         disabled={
//           disabled ||
//           !text.trim()
//         }
//         title="Send message"
//       >
//         <i className="bi bi-send-fill" />
//       </button>
//     </form>



   
// // <form
// //   className="d-flex align-items-center gap-2 bg-white border-top p-2 p-md-3"
// //   onSubmit={handleSubmit}
// // >
// //   {/* Emoji Picker */}
// //   <div
// //     className="position-relative flex-shrink-0"
// //     ref={emojiPickerRef}
// //   >
// //     <button
// //       type="button"
// //       className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
// //       onClick={() =>
// //         setShowEmojiPicker(
// //           (previous) => !previous
// //         )
// //       }
// //       disabled={disabled}
// //       title="Add emoji"
// //       style={{
// //         width: "42px",
// //         height: "42px",
// //       }}
// //     >
// //       <i className="bi bi-emoji-smile fs-5"></i>
// //     </button>

// //     {showEmojiPicker && (
// //       <div
// //         className="position-absolute bottom-100 start-0 mb-2 shadow rounded-3 overflow-hidden"
// //         style={{
// //           zIndex: 1050,
// //           maxWidth: "calc(100vw - 20px)",
// //         }}
// //       >
// //         <EmojiPicker
// //           onEmojiClick={handleEmojiClick}
// //           width={320}
// //           height={400}
// //           searchDisabled={false}
// //           skinTonesDisabled={false}
// //           previewConfig={{
// //             showPreview: false,
// //           }}
// //         />
// //       </div>
// //     )}
// //   </div>

// //   {/* Message Input */}
// //   <input
// //     type="text"
// //     className="form-control rounded-pill px-3"
// //     placeholder="Type a message..."
// //     value={text}
// //     onChange={handleChange}
// //     onKeyDown={handleKeyDown}
// //     disabled={disabled}
// //   />

// //   {/* Send Button */}
// //   <button
// //     type="submit"
// //     className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
// //     disabled={
// //       disabled ||
// //       !text.trim()
// //     }
// //     title="Send message"
// //     style={{
// //       width: "42px",
// //       height: "42px",
// //     }}
// //   >
// //     <i className="bi bi-send-fill"></i>
// //   </button>
// // </form>


//   );
// };

// export default MessageInput;



// -------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";

import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ disabled, onSend, onTypingStart, onTypingStop }) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = useRef(null);

  // --------------------------------
  // Close emoji picker when clicking outside
  // --------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --------------------------------
  // Handle input change
  // --------------------------------

  const handleChange = (event) => {
    const value = event.target.value;

    setText(value);

    if (value.trim()) {
      onTypingStart?.();
    } else {
      onTypingStop?.();
    }
  };

  // --------------------------------
  // Add emoji to message
  // --------------------------------

  const handleEmojiClick = (emojiData) => {
    setText((previous) => {
      return previous + emojiData.emoji;
    });

    onTypingStart?.();
  };

  // --------------------------------
  // Send message
  // --------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    try {
      await onSend(text.trim());

      setText("");
      setShowEmojiPicker(false);

      onTypingStop?.();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // --------------------------------
  // Handle Enter key
  // --------------------------------

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (text.trim()) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  };

  return (
    <form
      className="cw-input-bar d-flex align-items-center gap-2 p-2 p-md-3"
      onSubmit={handleSubmit}
    >
      {/* Emoji Picker */}
      <div className="position-relative flex-shrink-0" ref={emojiPickerRef}>
        <button
          type="button"
          className="cw-icon-btn cw-focusable"
          onClick={() => setShowEmojiPicker((previous) => !previous)}
          disabled={disabled}
          title="Add emoji"
        >
          <i className="bi bi-emoji-smile fs-5"></i>
        </button>

        {showEmojiPicker && (
          <div
            className="position-absolute bottom-100 start-0 mb-2 shadow rounded-3 overflow-hidden"
            style={{ zIndex: 1050, maxWidth: "calc(100vw - 20px)" }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={320}
              height={400}
              searchDisabled={false}
              skinTonesDisabled={false}
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}
      </div>

      {/* Message Input */}
      <input
        type="text"
        className="cw-text-input cw-focusable form-control rounded-pill px-3"
        placeholder="Type a message..."
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      {/* Send Button */}
      <button
        type="submit"
        className="cw-send-btn cw-focusable"
        disabled={disabled || !text.trim()}
        title="Send message"
      >
        <i className="bi bi-send-fill"></i>
      </button>
    </form>
  );
};

export default MessageInput;

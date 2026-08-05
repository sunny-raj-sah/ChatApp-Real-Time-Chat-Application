  
// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// const MessageInput = ({
//   disabled,
//   onSend,
//   onTypingStart,
//   onTypingStop,
// }) => {
//   const [text, setText] =
//     useState("");

//   const typingTimeoutRef =
//     useRef(null);

//   const isTypingRef =
//     useRef(false);

//   // --------------------------------
//   // Cleanup typing timeout
//   // --------------------------------

//   useEffect(() => {
//     return () => {
//       if (
//         typingTimeoutRef.current
//       ) {
//         clearTimeout(
//           typingTimeoutRef.current
//         );
//       }

//       if (
//         isTypingRef.current
//       ) {
//         onTypingStop?.();

//         isTypingRef.current =
//           false;
//       }
//     };
//   }, [onTypingStop]);

//   // --------------------------------
//   // Handle typing
//   // --------------------------------

//   const handleChange = (
//     event
//   ) => {
//     const value =
//       event.target.value;

//     setText(value);

//     if (!value.trim()) {
//       if (
//         isTypingRef.current
//       ) {
//         onTypingStop?.();

//         isTypingRef.current =
//           false;
//       }

//       if (
//         typingTimeoutRef.current
//       ) {
//         clearTimeout(
//           typingTimeoutRef.current
//         );
//       }

//       return;
//     }

//     // Start typing
//     if (
//       !isTypingRef.current
//     ) {
//       onTypingStart?.();

//       isTypingRef.current =
//         true;
//     }

//     // Reset timeout
//     if (
//       typingTimeoutRef.current
//     ) {
//       clearTimeout(
//         typingTimeoutRef.current
//       );
//     }

//     typingTimeoutRef.current =
//       setTimeout(() => {
//         onTypingStop?.();

//         isTypingRef.current =
//           false;
//       }, 1200);
//   };

//   // --------------------------------
//   // Submit
//   // --------------------------------

//   const handleSubmit = async (
//     event
//   ) => {
//     event.preventDefault();

//     if (!text.trim()) {
//       return;
//     }

//     if (
//       typingTimeoutRef.current
//     ) {
//       clearTimeout(
//         typingTimeoutRef.current
//       );
//     }

//     if (
//       isTypingRef.current
//     ) {
//       onTypingStop?.();

//       isTypingRef.current =
//         false;
//     }

//     await onSend(
//       text.trim()
//     );

//     setText("");
//   };

//   return (
//     <form
//       className="message-input"
//       onSubmit={handleSubmit}
//     >
//       <input
//         type="text"
//         placeholder="Type a message..."
//         value={text}
//         onChange={handleChange}
//         disabled={disabled}
//       />

//       <button
//         type="submit"
//         className="btn btn-primary"
//         disabled={
//           disabled ||
//           !text.trim()
//         }
//       >
//         <i className="bi bi-send-fill" />
//       </button>
//     </form>
//   );
// };

// export default MessageInput;


// ---------------------------------------
import { useEffect, useRef, useState } from "react";

import EmojiPicker from "emoji-picker-react";

const MessageInput = ({
  disabled,
  onSend,
  onTypingStart,
  onTypingStop,
}) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

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

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
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
      console.error(
        "Failed to send message:",
        error
      );
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
      className="message-input"
      onSubmit={handleSubmit}
    >
      {/* Emoji Picker */}

      <div
        className="emoji-picker-wrapper"
        ref={emojiPickerRef}
      >
        <button
          type="button"
          className="emoji-button"
          onClick={() =>
            setShowEmojiPicker(
              (previous) => !previous
            )
          }
          disabled={disabled}
          title="Add emoji"
        >
          <i className="bi bi-emoji-smile" />
        </button>

        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={320}
              height={400}
              searchDisabled={false}
              skinTonesDisabled={false}
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}
      </div>

      {/* Message Input */}

      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      {/* Send Button */}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={
          disabled ||
          !text.trim()
        }
        title="Send message"
      >
        <i className="bi bi-send-fill" />
      </button>
    </form>
  );
};

export default MessageInput;
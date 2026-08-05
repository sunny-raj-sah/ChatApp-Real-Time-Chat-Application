// import { useState } from "react";

// const MessageInput = ({
//   disabled,
//   onSend,
// }) => {
//   const [text, setText] =
//     useState("");

//   const handleSubmit = async (
//     event
//   ) => {
//     event.preventDefault();

//     if (!text.trim()) {
//       return;
//     }

//     await onSend(text.trim());

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
//         onChange={(event) =>
//           setText(event.target.value)
//         }
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

// -------------------------------------
import {
  useEffect,
  useRef,
  useState,
} from "react";

const MessageInput = ({
  disabled,
  onSend,
  onTypingStart,
  onTypingStop,
}) => {
  const [text, setText] =
    useState("");

  const typingTimeoutRef =
    useRef(null);

  const isTypingRef =
    useRef(false);

  // --------------------------------
  // Cleanup typing timeout
  // --------------------------------

  useEffect(() => {
    return () => {
      if (
        typingTimeoutRef.current
      ) {
        clearTimeout(
          typingTimeoutRef.current
        );
      }

      if (
        isTypingRef.current
      ) {
        onTypingStop?.();

        isTypingRef.current =
          false;
      }
    };
  }, [onTypingStop]);

  // --------------------------------
  // Handle typing
  // --------------------------------

  const handleChange = (
    event
  ) => {
    const value =
      event.target.value;

    setText(value);

    if (!value.trim()) {
      if (
        isTypingRef.current
      ) {
        onTypingStop?.();

        isTypingRef.current =
          false;
      }

      if (
        typingTimeoutRef.current
      ) {
        clearTimeout(
          typingTimeoutRef.current
        );
      }

      return;
    }

    // Start typing
    if (
      !isTypingRef.current
    ) {
      onTypingStart?.();

      isTypingRef.current =
        true;
    }

    // Reset timeout
    if (
      typingTimeoutRef.current
    ) {
      clearTimeout(
        typingTimeoutRef.current
      );
    }

    typingTimeoutRef.current =
      setTimeout(() => {
        onTypingStop?.();

        isTypingRef.current =
          false;
      }, 1200);
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    if (
      typingTimeoutRef.current
    ) {
      clearTimeout(
        typingTimeoutRef.current
      );
    }

    if (
      isTypingRef.current
    ) {
      onTypingStop?.();

      isTypingRef.current =
        false;
    }

    await onSend(
      text.trim()
    );

    setText("");
  };

  return (
    <form
      className="message-input"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={handleChange}
        disabled={disabled}
      />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={
          disabled ||
          !text.trim()
        }
      >
        <i className="bi bi-send-fill" />
      </button>
    </form>
  );
};

export default MessageInput;
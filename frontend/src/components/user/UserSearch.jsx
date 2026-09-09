// import { useState } from "react";

// import { useChat } from "../../context/ChatContext";

// const UserSearch = () => {
//   const [query, setQuery] =
//     useState("");

//   const {
//     users,
//     searchUsers,
//     createConversation,
//     loadingUsers,
//   } = useChat();

//   const handleChange = async (
//     event
//   ) => {
//     const value =
//       event.target.value;

//     setQuery(value);

//     await searchUsers(value);
//   };

//   // const handleUserClick = async (
//   //   user
//   // ) => {
//   //   await createConversation(
//   //     user._id
//   //   );

//   //   setQuery("");
//   // };
// const handleUserClick = async (selectedUser) => {
//   try {
//     await createConversation(selectedUser._id);
//     setQuery("");
//   } catch (error) {
//     console.error(
//       "Failed to open conversation:",
//       error
//     );
//   }
// };
//   return (
//     <div className="user-search">
//       <div className="search-box">
//         <i className="bi bi-search" />

//         <input
//           type="text"
//           placeholder="Search users..."
//           value={query}
//           onChange={handleChange}
//         />
//       </div>

//       {query && (
//         <div className="search-results">
//           {loadingUsers && (
//             <div className="search-loading">
//               Searching...
//             </div>
//           )}

//           {!loadingUsers &&
//             users.length === 0 && (
//               <div className="search-empty">
//                 No users found
//               </div>
//             )}

//           {!loadingUsers &&
//             users.map((user) => (
//               <button
//                 type="button"
//                 key={user._id}
//                 className="search-user"
//                 onClick={() =>
//                   handleUserClick(user)
//                 }
//               >
//                 <div className="user-avatar">
//                   {user.name
//                     .charAt(0)
//                     .toUpperCase()}
//                 </div>

//                 <div>
//                   <strong>
//                     {user.name}
//                   </strong>

//                   <small>
//                     {user.email}
//                   </small>
//                 </div>
//               </button>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserSearch;

// ---------------------------------------------------------


import { useState } from "react";

import { useChat } from "../../context/ChatContext";

const UserSearch = () => {
  const [query, setQuery] = useState("");

  const { users, searchUsers, createConversation, loadingUsers } = useChat();

  const handleChange = async (event) => {
    const value = event.target.value;

    setQuery(value);

    await searchUsers(value);
  };

  const handleUserClick = async (selectedUser) => {
    try {
      await createConversation(selectedUser._id);
      setQuery("");
    } catch (error) {
      console.error("Failed to open conversation:", error);
    }
  };

  return (
    <div className="p-3 border-bottom">
      <div className="cw-search-box">
        <i className="bi bi-search" />

        <input
          type="text"
          className="cw-focusable form-control rounded-pill"
          placeholder="Search users..."
          value={query}
          onChange={handleChange}
        />
      </div>

      {query && (
        <div
          className="cw-scroll mt-2 border rounded-3 overflow-auto"
          style={{ maxHeight: "260px", borderColor: "var(--cw-border)" }}
        >
          {loadingUsers && (
            <div className="p-3 text-muted small">Searching...</div>
          )}

          {!loadingUsers && users.length === 0 && (
            <div className="p-3 text-muted small">No users found</div>
          )}

          {!loadingUsers &&
            users.map((user) => (
              <button
                type="button"
                key={user._id}
                className="cw-search-result cw-focusable btn w-100 text-start border-0 rounded-0 p-2 d-flex align-items-center gap-2"
                onClick={() => handleUserClick(user)}
              >
                <div
                  className="cw-avatar"
                  style={{ width: "36px", height: "36px", fontSize: "14px" }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="overflow-hidden">
                  <strong
                    className="d-block text-truncate small"
                    style={{ color: "var(--cw-ink)" }}
                  >
                    {user.name}
                  </strong>

                  <small className="text-muted text-truncate d-block">
                    {user.email}
                  </small>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;

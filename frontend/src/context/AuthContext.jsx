// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import api from "../services/api";


// import {
//   connectSocket,
//   disconnectSocket,
// } from "../services/socket";


// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     const loadUser = async () => {
//       try {
//         const response =
//           await api.get("/users/me");

//         setUser(response.data.user);
//          connectSocket(token);
//       } catch (error) {
//          disconnectSocket();
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   const login = async (email, password) => {
//     const response = await api.post(
//       "/auth/login",
//       {
//         email,
//         password,
//       }
//     );

//     const { token, user } =
//       response.data;

//     localStorage.setItem(
//       "token",
//       token
//     );

//     localStorage.setItem(
//       "user",
//       JSON.stringify(user)
//     );

//     setUser(user);
//      connectSocket(token);
//     return user;
//   };

//   const register = async (
//     name,
//     email,
//     password
//   ) => {
//     const response = await api.post(
//       "/auth/register",
//       {
//         name,
//         email,
//         password,
//       }
//     );

//     const { token, user } =
//       response.data;

//     localStorage.setItem(
//       "token",
//       token
//     );

//     localStorage.setItem(
//       "user",
//       JSON.stringify(user)
//     );

//     setUser(user);
//  connectSocket(token);
//     return user;
//   };

//   const logout = () => {
//      disconnectSocket();
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// ----------------------------------------------------
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import {
  connectSocket,
  disconnectSocket,
} from "../services/socket";

const AuthContext = createContext(null);

// Different endpoints on the backend can serialize the user
// differently (some send `_id`, some send `id`). Normalizing
// here means every consumer of `user` can always rely on
// `user._id` existing, no matter which endpoint produced it.
const normalizeUser = (rawUser) => {
  if (!rawUser) {
    return rawUser;
  }

  return {
    ...rawUser,
    _id: rawUser._id || rawUser.id,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const response = await api.get("/users/me");

        setUser(normalizeUser(response.data.user));
        connectSocket(token);
      } catch (error) {
        disconnectSocket();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    const normalized = normalizeUser(user);

    console.log("LOGIN RAW response.data:", response.data);
    console.log("LOGIN normalized user:", normalized);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(normalized));

    setUser(normalized);
    connectSocket(token);
    return normalized;
  };

  const register = async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    const { token, user } = response.data;

    const normalized = normalizeUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(normalized));

    setUser(normalized);
    connectSocket(token);
    return normalized;
  };

  const logout = () => {
    disconnectSocket();
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

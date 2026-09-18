# 💬 ChatApp — Real-Time Chat Application

A full-stack one-to-one real-time messaging application built with **React, Node.js, Express.js, MongoDB, and Socket.IO**.

ChatApp supports JWT authentication, user search, conversations, real-time messaging, online/offline presence, typing indicators, message status fields, paginated message history, and ownership-controlled message deletion.

## 🚀 Live Demo

**Frontend:** https://chat-app-real-time-chat-application-woad.vercel.app/login

**Backend:** https://chatapp-real-time-chat-application-f1bf.onrender.com/

## ✨ Features

- 🔐 User registration and JWT-based login
- 🔎 Search users by name or email
- 💬 One-to-one conversations
- ⚡ Real-time messaging with Socket.IO
- 🟢 Online/offline presence and last seen
- ✍️ Real-time typing indicators
- ✓ Sent / delivered / read message status model
- 🗑️ Delete your own messages with server-side ownership validation
- 📋 Conversation previews and automatic reordering
- 📜 Paginated message history
- 📱 Responsive chat interface
- 😀 Emoji picker support

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, React Router, Context API, Axios, Socket.IO Client |
| UI | Bootstrap 5, Bootstrap Icons, Emoji Picker React |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Real-time | Socket.IO |
| Authentication | JWT, bcryptjs |
| Configuration | dotenv |
| Deployment | Vercel, Render |

## 🏗️ Architecture

```text
                    React Frontend
                         |
              +----------+----------+
              |                     |
            Axios              Socket.IO Client
              |                     |
              v                     v
       Express REST API       Socket.IO Server
              |                     |
              +----------+----------+
                         |
                      MongoDB
                         |
             +-----------+-----------+
             |           |           |
           Users   Conversations  Messages
```

The application intentionally combines REST and Socket.IO:

- **REST** handles authentication, user search, conversation retrieval, and message-history pagination.
- **Socket.IO** handles message delivery, typing, presence, conversation rooms, and message deletion.

## 🔐 Authentication Flow

1. User registers or logs in through the Express API.
2. Passwords are hashed/verified with bcrypt.
3. The server issues a JWT valid for 7 days.
4. React stores the token in localStorage.
5. Axios uses the token for protected API requests.
6. Socket.IO sends the same token during connection authentication.
7. The backend verifies the token and associates the authenticated user with the socket.

## 💬 Real-Time Message Flow

```text
Sender
  |
  | message:send
  v
Socket.IO Server
  |
  +--> validate conversation
  +--> verify participant
  +--> create Message
  +--> update Conversation
  |
  v
MongoDB
  |
  v
conversation:<conversationId>
  |
  +--------> Sender
  +--------> Receiver
              |
              v
       message:receive
```

Conversation-specific rooms keep real-time events scoped to the relevant participants.

## ✍️ Typing & Presence

Typing is handled through transient Socket.IO events:

```text
typing:start
typing:stop
```

Presence is persisted on the user document:

```text
user:online  -> isOnline = true
user:offline -> isOnline = false + lastSeen
```

The React chat context updates users and conversation participants when these events arrive.

## 🗑️ Message Deletion

Only the sender can delete a message.

The backend:

1. Finds the message.
2. Verifies the authenticated socket user owns it.
3. Deletes it from MongoDB.
4. Finds the new latest message for the conversation.
5. Updates the conversation preview.
6. Emits the deletion event to the conversation room.

## 🗃️ Data Models

### User

```text
User
├── name
├── email
├── password
├── profileImage
├── isOnline
├── lastSeen
└── timestamps
```

### Conversation

```text
Conversation
├── participants[]
├── lastMessage
├── lastMessageAt
└── timestamps
```

### Message

```text
Message
├── conversation
├── sender
├── text
├── status
├── deliveredAt
├── readAt
└── timestamps
```

## 📂 Project Structure

```text
ChatApp-Real-Time-Chat-Application/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── socket/
│       ├── app.js
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── chat/
│       │   ├── conversation/
│       │   └── user/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.js
│       └── index.js
├── docs/
│   └── case-study-real-time-chat.md
└── README.md
```

## ⚙️ Local Setup

### Clone

```bash
git clone https://github.com/sunny-raj-sah/ChatApp-Real-Time-Chat-Application.git
cd ChatApp-Real-Time-Chat-Application
```

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

Run:

```bash
npm run dev
```

### Frontend

In another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

Run:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## 🔌 REST API

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/users/me` | Current user |
| GET | `/api/users` | List users |
| GET | `/api/users/search?q=<query>` | Search users |
| GET | `/api/users/:id` | Get user |
| GET | `/api/conversations` | Get conversations |
| POST | `/api/conversations` | Create/get conversation |
| GET | `/api/messages/:conversationId` | Paginated message history |
| POST | `/api/messages` | REST message endpoint |

The primary chat UI sends messages through Socket.IO.

## 🔌 Socket Events

| Event | Direction | Purpose |
|---|---|---|
| `conversation:join` | Client → Server | Join authorized room |
| `message:send` | Client → Server | Send message |
| `message:receive` | Server → Client | Deliver message |
| `message:delete` | Both | Delete/synchronize message |
| `typing:start` | Both | Start typing indicator |
| `typing:stop` | Both | Stop typing indicator |
| `user:online` | Server → Client | Presence update |
| `user:offline` | Server → Client | Presence update |
| `message:error` | Server → Client | Socket error |

## 🔒 Security

- bcrypt password hashing
- JWT verification
- Protected REST routes
- Authenticated Socket.IO connections
- Conversation membership checks
- Message ownership checks
- Password exclusion from populated user objects
- Environment-based secrets
- CORS configuration

> The current frontend persists JWTs in localStorage. For stronger production session security, HTTP-only secure cookies can be evaluated with an appropriate CSRF strategy.

## 🚀 Deployment

- **Frontend:** Vercel
- **Backend + Socket.IO:** Render
- **Database:** MongoDB

## 📖 Engineering Case Study

Detailed architecture and implementation documentation:

**[Real-Time Chat Application Case Study](./docs/case-study-real-time-chat.md)**

## 🛣️ Future Improvements

- Group conversations
- Message editing
- Unread message counters
- Attachments and image sharing
- Message reactions
- Conversation deletion
- Push notifications
- Richer read/delivery event handling
- Redis Socket.IO adapter for horizontal scaling
- Automated API/frontend/socket tests
- Message virtualization for large histories

## 🔗 Links

- [Live Application](https://chat-app-real-time-chat-application-woad.vercel.app/login)
- [GitHub Repository](https://github.com/sunny-raj-sah/ChatApp-Real-Time-Chat-Application)
- [Sunny Raj Portfolio](https://portfolio-eight-vert-40.vercel.app/#projects)

## 👨‍💻 Author

**Sunny Raj**

B.Tech Computer Science & Engineering

- GitHub: https://github.com/sunny-raj-sah
- Portfolio: https://portfolio-eight-vert-40.vercel.app/

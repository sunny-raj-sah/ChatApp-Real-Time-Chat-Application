# 💬 ChatApp — Real-Time Chat Application

A full-stack real-time chat application built with the **MERN stack** and **Socket.IO**.

ChatApp allows users to securely authenticate, search for other users, start conversations, exchange messages in real time, see online/offline status, view typing indicators, track message delivery/read status, and delete their own messages.

---

## 🚀 Live Demo

> Add your deployed frontend URL here after deployment.

**Frontend:** `Coming Soon`

**Backend API:** `Coming Soon`

---

# 📸 Features

## 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Persistent login using `localStorage`
- Secure logout

## 💬 Real-Time Messaging

- Send messages instantly using Socket.IO
- Messages appear without refreshing the page
- Real-time message delivery
- Conversation-based Socket.IO rooms
- Sender and receiver synchronization

## 👤 User Management

- Search users by name or email
- Start a conversation with another user
- Display user name and email
- Display user profile avatar
- Real-time online/offline presence
- Last seen information

## ✍️ Typing Indicator

- Real-time `Typing...` indicator
- Typing status appears in the conversation list
- Typing events are handled through Socket.IO
- Automatically stops typing status when typing ends

## ✓ Message Status

Messages support:

- `Sent` ✓
- `Delivered` ✓✓
- `Read` ✓✓

## 🗑️ Message Management

- Delete your own messages
- Delete messages from MongoDB
- Real-time message deletion for both users
- Deleted messages disappear without refreshing
- Conversation preview updates after message deletion

## 📋 Conversation Sidebar

- List all conversations
- Show conversation participant
- Show latest message
- Show latest message time
- Automatically update conversation order
- Real-time conversation preview updates
- Display `Typing...` instead of the latest message when the user is typing

## 🟢 Online Presence

- Real-time online status
- Real-time offline status
- Last seen tracking
- Presence updates without page refresh
- Online/offline status synchronized between users

## 📧 Chat Header

- Display conversation participant's name
- Display participant's email
- Display online/offline status
- Display user avatar

## 🔎 User Search

- Search users from the sidebar
- Search by name or email
- Real-time search results
- Start a conversation directly from search results
- Automatically open the selected conversation

## ⚡ Real-Time Synchronization

- Real-time message synchronization
- Real-time typing synchronization
- Real-time online/offline synchronization
- Real-time message deletion
- Real-time conversation preview updates
- Automatic conversation reordering
- No manual page refresh required for real-time events

## 🗄️ Database & Backend

- MongoDB database
- Mongoose ODM
- RESTful API architecture
- Express.js backend
- JWT authentication middleware
- Password hashing
- Protected resources
- Message ownership validation
- Conversation-based data management

## 🔌 Socket.IO

The application uses Socket.IO for:

- `message:send`
- `message:receive`
- `message:delete`
- `typing:start`
- `typing:stop`
- `user:online`
- `user:offline`
- `conversation:join`
- `message:error`

## 🔒 Security

- JWT authentication
- Password hashing
- Protected Express routes
- Authorization middleware
- Socket.IO authentication
- CORS configuration
- Environment variables for sensitive configuration
- Message ownership validation before deletion

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router
- Context API
- Axios
- Socket.IO Client
- Bootstrap
- Bootstrap Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt
- CORS
- dotenv

---

# 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      React App      │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                    REST API + Socket.IO
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express  │
                    │      Backend         │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌────────────────┐          ┌────────────────┐
        │    Socket.IO   │          │   REST APIs    │
        │ Real-time      │          │ Authentication │
        │ communication  │          │ Conversations  │
        └────────────────┘          │ Messages       │
                                    └───────┬────────┘
                                            │
                                            ▼
                                   ┌────────────────┐
                                   │    MongoDB     │
                                   │                │
                                   │ Users          │
                                   │ Conversations  │
                                   │ Messages       │
                                   └────────────────┘


---

# 📂 Project Structure

```text
chat-application/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── conversationController.js
│   │   │   ├── messageController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Conversation.js
│   │   │   └── Message.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── conversationRoutes.js
│   │   │   └── messageRoutes.js
│   │   │
│   │   ├── socket/
│   │   │   └── socketHandler.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   ├── conversation/
│   │   │   └── user/
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ChatContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/chat-application.git
cd chat-application
```

---

# 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

Start the backend in development mode:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

If environment variables are used, create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 🔑 Authentication

The application uses **JWT authentication** for securing user accounts and API requests.

## Authentication Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
Express API
 │
 ▼
Validate User
 │
 ▼
Generate JWT
 │
 ▼
Frontend
 │
 ├── Store token in localStorage
 │
 ├── Attach token to API requests
 │
 └── Use token for Socket.IO authentication
```

API requests use:

```http
Authorization: Bearer <token>
```

Socket.IO also authenticates the connection using the JWT token.

---

# 💬 Real-Time Messaging

Messages are delivered using **Socket.IO**.

```text
Sender
   │
   │ message:send
   ▼
Socket.IO Server
   │
   ├── Validate user
   │
   ├── Save message
   │       │
   │       ▼
   │    MongoDB
   │
   └── message:receive
          │
          ├──────────────► Sender
          │
          └──────────────► Receiver
```

Messages appear in the chat without requiring a page refresh.

---

# 🏠 Conversation Rooms

Each conversation uses a dedicated Socket.IO room.

```text
conversation:join
        │
        ▼
 conversationId
        │
        ▼
 Socket.IO Room
        │
        ├── Sender
        │
        └── Receiver
```

Only users belonging to the conversation can receive events for that conversation.

---

# ✍️ Typing Indicator

The application provides a real-time typing indicator.

When a user starts typing:

```text
typing:start
```

When the user stops typing:

```text
typing:stop
```

The other user sees:

```text
Typing...
```

The typing indicator is also displayed in the conversation sidebar.

---

# 🟢 Online / Offline Presence

The application tracks user presence using Socket.IO.

When a user connects:

```text
user:online
```

When the user disconnects:

```text
user:offline
```

The application updates:

- Online status
- Offline status
- Last seen
- Conversation participant status

Example:

```text
Sunny Raj
Online
```

or:

```text
Sunny Raj
Offline
```

---

# 🗑️ Message Deletion

Users can delete messages that they have sent.

```text
User
 │
 ▼
Delete Message
 │
 ▼
Socket.IO
 │
 ▼
Backend
 │
 ├── Validate message
 │
 ├── Validate message ownership
 │
 ├── Delete from MongoDB
 │
 └── Broadcast deletion event
 │
 ▼
message:delete
 │
 ├──────────────► Sender
 │
 └──────────────► Receiver
```

The deleted message is removed from:

- MongoDB
- Sender's chat
- Receiver's chat
- Conversation preview when applicable

---

# 📋 Conversation Sidebar

The sidebar displays:

- Other user's name
- Profile avatar
- Last message
- Last message time
- Typing indicator
- Conversation ordering

When a new message arrives, the conversation is automatically moved to the top.

Example:

```text
┌──────────────────────────────┐
│ Rahul                 12:35  │
│ Typing...                    │
├──────────────────────────────┤
│ Amit                  11:42  │
│ Hello!                       │
└──────────────────────────────┘
```

---

# 📧 Chat Header

When a conversation is selected, the chat header displays the other user's:

- Name
- Email
- Online/offline status

Example:

```text
┌──────────────────────────────────────────┐
│  R                                      │
│  Rahul Kumar     rahul@example.com      │
│  Online                                  │
└──────────────────────────────────────────┘
```

---

# 🗃️ Database Models

## User

```text
User
├── name
├── email
├── password
├── profileImage
├── isOnline
├── lastSeen
├── createdAt
└── updatedAt
```

## Conversation

```text
Conversation
├── participants[]
├── lastMessage
├── lastMessageAt
├── createdAt
└── updatedAt
```

## Message

```text
Message
├── conversation
├── sender
├── text
├── status
├── deliveredAt
├── readAt
├── createdAt
└── updatedAt
```

---

# 🔌 REST API

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Users

### Get Users

```http
GET /api/users
```

### Search Users

```http
GET /api/users/search?q=<query>
```

### Get Current User

```http
GET /api/users/me
```

---

## Conversations

### Get My Conversations

```http
GET /api/conversations
```

### Create / Get Conversation

```http
POST /api/conversations
```

Request body:

```json
{
  "userId": "USER_ID"
}
```

---

## Messages

### Get Conversation Messages

```http
GET /api/messages/:conversationId
```

Real-time message sending is handled through Socket.IO.

---

# 🔌 Socket.IO Events

## Connection Events

```text
connect
disconnect
connect_error
```

## Conversation Events

```text
conversation:join
```

## Message Events

```text
message:send
message:receive
message:delete
message:error
```

## Typing Events

```text
typing:start
typing:stop
```

## Presence Events

```text
user:online
user:offline
```

---

# 🔄 Real-Time Event Flow

```text
┌──────────────────────────────────────┐
│          Socket.IO Events            │
├──────────────────────────────────────┤
│                                      │
│  💬 message:send                     │
│  💬 message:receive                  │
│                                      │
│  ✍️ typing:start                     │
│  ✍️ typing:stop                      │
│                                      │
│  🟢 user:online                      │
│  ⚫ user:offline                     │
│                                      │
│  🗑️ message:delete                   │
│                                      │
│  ✓ message status                    │
│                                      │
└──────────────────────────────────────┘
```

---

# 🔒 Security

The application implements:

- JWT authentication
- Protected Express routes
- Password hashing
- Authorization middleware
- Socket.IO authentication
- CORS configuration
- Environment variables for secrets
- User ownership validation for message deletion

> **Important:** Never commit your `.env` files or database credentials to GitHub.

---

# 🧪 Development

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the application:

```text
http://localhost:5173
```

---

# 🛣️ Future Improvements

- 🧹 Clear chat
- 🗑️ Delete conversation
- ✏️ Edit messages
- ✓✓ Read receipts
- 📎 Image and file sharing
- 🎤 Voice messages
- ❤️ Message reactions
- 👥 Group conversations
- 🛡️ Group administration
- 🔔 Push notifications
- 📜 Message pagination
- 🔢 Unread message count
- 👤 User profile pictures
- 🕐 Detailed last-seen information
- 📱 Mobile application
- 🚀 Production deployment
- ⚡ Redis-based Socket.IO scaling

---

# 📌 Project Highlights

This project demonstrates practical implementation of:

- Full-stack JavaScript development
- REST API development
- JWT authentication
- MongoDB data modeling
- React Context API
- Socket.IO real-time communication
- WebSocket-based presence tracking
- Real-time typing indicators
- Real-time message synchronization
- Real-time message deletion
- Protected backend resources
- Client-side state synchronization

---

# 👨‍💻 Author

**Sunny Raj**

B.Tech Computer Science & Engineering

### GitHub

https://github.com/sunny-raj-sah

---

# ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---
# 🚀 TaskMaster - Real-Time Task Management Platform

<div align="center">

![TaskMaster Logo](https://img.shields.io/badge/TaskMaster-Production-success)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, full-stack task management application with real-time collaboration features built using the MERN stack.

[Live Demo](https://task-master-three-psi.vercel.app) | [API Docs](https://task-master-oznm.onrender.com) | [Report Bug](https://github.com/yourusername/taskmaster/issues)

</div>

---

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Task Management
![Task Management](screenshots/tasks.png)

### Real-time Updates
![Real-time](screenshots/realtime.gif)

> **Note:** Add screenshots by creating a `screenshots` folder in your repo

---

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - JWT-based user authentication with refresh tokens
- ✅ **Task Management** - Create, read, update, and delete tasks with ease
- ⚡ **Real-Time Sync** - Instant updates across all connected users via Socket.io
- 🔍 **Advanced Filtering** - Filter tasks by status, priority, and search terms
- 📊 **Statistics Dashboard** - Visual overview of task completion rates
- 🎯 **Priority Levels** - Organize tasks by Low, Medium, and High priority
- 📅 **Due Dates** - Set and track task deadlines
- 👥 **User Profiles** - Personalized user accounts and task ownership

### Technical Highlights
- 🚀 **Production Ready** - Fully deployed with CI/CD pipeline
- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- 🔄 **Auto-Reconnect** - Socket connection resilience with automatic reconnection
- 🛡️ **Secure** - Password hashing, token validation, and protected routes
- ⚡ **Fast** - Optimized API responses and efficient state management
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-6.21.1-CA4245?logo=react-router)
![Axios](https://img.shields.io/badge/Axios-1.6.5-5A29E4?logo=axios)
![Socket.io](https://img.shields.io/badge/Socket.io_Client-4.6.1-010101?logo=socket.io)

- **React.js** - UI library for building component-based interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors for token refresh
- **Socket.io Client** - Real-time bidirectional communication
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **date-fns** - Date formatting and manipulation

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)
![Socket.io](https://img.shields.io/badge/Socket.io-4.6.1-010101?logo=socket.io)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens)

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time engine
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?logo=render)

- **Vercel** - Frontend hosting with automatic deployments
- **Render** - Backend hosting with continuous deployment

---

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │          React Application (Vercel)                  │  │
│  │  • Components  • Hooks  • Context  • Services       │  │
│  └───────────────────┬─────────────────────────────────┘  │
│                      │                                      │
└──────────────────────┼──────────────────────────────────────┘
                       │
                       ├─────── HTTP/REST API
                       │
                       └─────── WebSocket (Socket.io)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      Express.js Server (Render)                      │   │
│  │  • REST API  • Socket.io  • JWT Auth                │   │
│  │  • Middleware  • Error Handling                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│                  Backend Services                            │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/taskmaster.git
   cd taskmaster
```

2. **Install Backend Dependencies**
```bash
   cd server
   npm install
```

3. **Install Frontend Dependencies**
```bash
   cd ../client
   npm install
```

### Running Locally

#### Backend Server

1. Navigate to server directory
```bash
   cd server
```

2. Create `.env` file (optional for local development)
```env
   PORT=5000
   NODE_ENV=development
```

3. Start the server
```bash
   npm start
```

   Server will run on `http://localhost:5000`

#### Frontend Application

1. Navigate to client directory
```bash
   cd client
```

2. Create `.env` file
```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
```

3. Start the development server
```bash
   npm start
```

   Application will open at `http://localhost:3000`

---

## 📡 API Documentation

### Base URL
```
Production: https://task-master-oznm.onrender.com/api
Local: http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {accessToken}

{
  "refreshToken": "..."
}

Response: 200 OK
{
  "success": true,
  "message": "Logout successful"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks?status=todo&priority=high&search=meeting&sort=-createdAt&page=1&limit=20
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "tasks": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "task": {
      "_id": "1",
      "title": "Complete project",
      "description": "Finish the TaskMaster project",
      "status": "inprogress",
      "priority": "high",
      "dueDate": "2024-12-31",
      "createdBy": {
        "_id": "1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-15T14:30:00.000Z"
    }
  }
}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-31"
}

Response: 201 Created
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": { ... }
  }
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Updated title",
  "status": "inprogress"
}

Response: 200 OK
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": { ... }
  }
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### Get Task Statistics
```http
GET /api/tasks/stats/summary
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "total": 45,
    "todo": 15,
    "inprogress": 20,
    "done": 10
  }
}
```

### WebSocket Events

#### Client → Server
```javascript
// No custom events needed from client
// Socket.io connection is automatic
```

#### Server → Client
```javascript
// Task created
socket.on('taskCreated', (task) => {
  console.log('New task:', task);
});

// Task updated
socket.on('taskUpdated', (task) => {
  console.log('Task updated:', task);
});

// Task deleted
socket.on('taskDeleted', (taskId) => {
  console.log('Task deleted:', taskId);
});
```

---

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Token Refresh** - Automatic token renewal
- **Protected Routes** - Authorization middleware
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Server-side validation
- **XSS Protection** - React's built-in XSS prevention
- **Environment Variables** - Sensitive data protection

---

## 📁 Project Structure
```
taskmaster/
├── client/                      # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.js
│   │   │   │   ├── TaskCard.js
│   │   │   │   ├── TaskForm.js
│   │   │   │   └── TaskFilters.js
│   │   │   └── Common/
│   │   │       ├── Navbar.js
│   │   │       ├── Loading.js
│   │   │       └── ErrorBoundary.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useTasks.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env
│
├── server/                      # Backend Node.js application
│   ├── server.js               # Main server file
│   ├── package.json
│   └── .env
│
├── screenshots/                 # Application screenshots
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure environment variables:
```
   REACT_APP_API_URL=https://task-master-oznm.onrender.com/api
   REACT_APP_SOCKET_URL=https://task-master-oznm.onrender.com
```
5. Deploy!

### Backend (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create new Web Service
4. Connect your repository
5. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
6. Deploy!

---

## 🧪 Testing
```bash
# Run frontend tests
cd client
npm test

# Run backend tests  
cd server
npm test
```

---

## 🎯 Future Enhancements

### Planned Features
- [ ] **Database Integration** - MongoDB/PostgreSQL for persistent storage
- [ ] **Task Assignment** - Assign tasks to specific team members
- [ ] **Comments System** - Add comments and discussions on tasks
- [ ] **File Attachments** - Upload and attach files to tasks
- [ ] **Email Notifications** - Get notified about task updates
- [ ] **Calendar View** - Visualize tasks on a calendar
- [ ] **Dark Mode** - Toggle between light and dark themes
- [ ] **Export/Import** - Export tasks to CSV/PDF
- [ ] **Team Workspaces** - Separate workspaces for different teams
- [ ] **Activity Log** - Track all task changes and activities
- [ ] **Mobile App** - React Native mobile application
- [ ] **Advanced Analytics** - Detailed insights and reports
- [ ] **Kanban Board** - Drag-and-drop task board
- [ ] **Recurring Tasks** - Set tasks to repeat automatically
- [ ] **Time Tracking** - Track time spent on tasks

### DevOps Enhancements
- [ ] Docker containerization
- [ ] Kubernetes orchestration
- [ ] CI/CD with GitHub Actions
- [ ] Monitoring with Prometheus/Grafana
- [ ] Log aggregation with ELK stack
- [ ] Auto-scaling setup
- [ ] Load balancing
- [ ] Database backups and recovery

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- Website: [yourwebsite.com](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 📊 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/yourusername/taskmaster?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/taskmaster?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/taskmaster)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/yourusername/taskmaster)
![Last Commit](https://img.shields.io/github/last-commit/yourusername/taskmaster)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Bharath]

[Report Bug](https://github.com/yourusername/taskmaster/issues) · [Request Feature](https://github.com/yourusername/taskmaster/issues)

</div>
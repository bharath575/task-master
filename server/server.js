const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));    

// Socket.io
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('taskCreated', (task) => {
        socket.broadcast.emit('taskCreated', task);
    });

    socket.on('taskUpdated', (task) => {
        socket.broadcast.emit('taskUpdated', task);
    });

    socket.on('taskDeleted', (taskId) => {
        socket.broadcast.emit('taskDeleted', taskId);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
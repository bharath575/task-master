const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

/* ------------------ CORS CONFIG ------------------ */

const appCors = cors({
    origin: process.env.FRONTEND_APP_URL,
    credentials: true
});
app.use(appCors);

app.use(express.json());

/* ------------------ SOCKET.IO ------------------ */
const io = socketIO(server, {
    cors: {
        origin: process.env.FRONTEND_SOCKET_URL,
        credentials: true
    }
});

/* ------------------ DATABASE ------------------ */
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

/* ------------------ ROUTES ------------------ */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

/* ------------------ SOCKET EVENTS ------------------ */
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

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
        console.log('Client disconnected:', socket.id);
    });
});

/* ------------------ SERVER ------------------ */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

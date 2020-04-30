var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { path: '/chat' });
var verifyToken = require('./auth/verify_token');
var cors = require('cors');

// Connect to MongoDB
require('./db/mongoose');

const auth = require('./routes/login');
const chat = require('./routes/chat');

var port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(auth);
app.use(chat.router);

app.get('/', (req, res) => {
    res.send('Chat App Backend');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    chat.handleChat(socket, io);
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

io.use((socket, next) => {
    console.log('validate socket here');
    next();
});

server.listen(port, () => console.log(`Server listening on port: ${port}`));

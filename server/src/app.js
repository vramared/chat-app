var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { path: '/dashboard' });
var cors = require('cors');

// tmp
var dev = require('./dev/dev_cmd');

// Connect to MongoDB
require('./db/mongoose');

const auth = require('./routes/login');
const chat = require('./routes/dashboard');
const socketConnection = require('./socket/socket');

var port = process.env.PORT || 3000;

app.use(cors());

// Middlewares
app.use(express.json());
app.use(auth);
app.use(chat);
app.use(dev);

app.get('/', (req, res) => {
    res.send('Chat App Backend');
});

socketConnection(io);

server.listen(port, () => console.log(`Server listening on port: ${port}`));

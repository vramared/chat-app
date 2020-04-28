var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, { path: '/chat' });
var cors = require('cors');

require('./db/mongoose');

const auth = require('./routes/login');
const chat = require('./routes/chat');

var port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(auth);
app.use(chat);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
    socket.on('chat', (msg) => {
        console.log(msg);
        io.emit('chat', `server acknowledges: ${msg}`);
    });
});

http.listen(port, () => console.log(`Server listening on port: ${port}`));

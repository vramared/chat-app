const socketConnection = function (io) {
    io.on('connection', (socket) => {
        console.log(`a user connected: ${socket.id}`);
        handleChat(socket);
        joinRoom(socket);
        leaveRoom(socket);
        socket.on('disconnect', () => {
            console.log(`a user disconnected: ${socket.id}`);
            socket.removeAllListeners();
        });
    });
};

const handleChat = function (socket) {
    socket.on('chat', (msg) => {
        console.log(msg);
        console.log('outputting to a room');
        socket.to(msg.chat_id).emit('chat', msg);
    });
};

const joinRoom = function (socket) {
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`joined room: ${room}`);
    });
};

const leaveRoom = function (socket) {
    socket.on('leave-room', (room) => {
        socket.leave(room);
        console.log(`left room: ${room}`);
    });
};

module.exports = socketConnection;

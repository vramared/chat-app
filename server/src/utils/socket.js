const socketConnection = function (io) {
    io.on('connection', (socket) => {
        console.log(`a user connected`);
        handleChat(socket);
        joinRoom(socket);
        leaveRoom(socket);
        disconnect(socket);
    });
};

const handleChat = function (socket) {
    socket.on('chat', (msg) => {
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

const disconnect = function (socket) {
    socket.on('disconnect', () => {
        console.log(`a user disconnected`);
        socket.removeAllListeners();
    });
};

module.exports = socketConnection;

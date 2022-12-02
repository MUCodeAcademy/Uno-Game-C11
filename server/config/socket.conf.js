function socketConfig(io) {
    io.on("connection", (socket) => {
        const { roomID, username } = socket.handshake.query;
        let roomCount = parseInt(io.sockets.adapter.rooms.get(roomID)?.size);
        socket.join(roomID);

        io.to(roomID).emit("user connect", { username });

        io.to(socket.id).emit("host check", roomCount);

        socket.on("new message", ({ body }) => {
            io.to(roomID).emit("new message", { username, body });
        });

        socket.on("end turn", ({ players, discardDeck, activeCard, isReverse, turn }) => {
            io.to(roomID).emit("end turn", { players, discardDeck, activeCard, isReverse, turn });
        });

        socket.on("start game", ({ players, playDeck, activeCard }) => {
            io.to(roomID).emit("start game", { players, playDeck, activeCard });
        });

        socket.on("disconnect", () => {
            io.to(roomID).emit("user disconnect", { username });
        });

        socket.on("game active", (activeGame) => {
            io.socket.broadcast.to(roomID).emit("game active", activeGame);
        });

        socket.on("draw card", (players) => {
            io.to(roomID).emit("draw card", players);
        });
    });

    //game socket
}
module.exports = socketConfig;

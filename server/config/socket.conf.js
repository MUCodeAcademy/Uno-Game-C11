function socketConfig(io) {

    io.on("connection", (socket) => {
        const { roomID, username } = socket.handshake.query;
        let roomCount = io.sockets.adapter.rooms.get(roomID)?.size

        socket.join(roomID)

        io.to(roomID).emit("user join", { username })

        socket.on("new message", ({ body }) => {
            io.to(roomID).emit("new message", { username, body });
        });

        socket.on("send cards", (cards) => {
            io.to(roomID).emit("send cards", cards)
        })

        socket.on("end turn", ({ activeCard, isRevers, players, discardDeck }) => {
            io.to(roomID).emit("end turn", { activeCard, isRevers, players, discardDeck })

        })

        socket.on("start game", (start) => {
            io.to(roomID).emit("start game", start)
        })

        socket.on("disconnect", () => {
            io.to(roomID).emit("user left", { username })
        });

        //game socket

        io.to(socket.id).emit("host check", roomCount)

        socket.on("game active", (activeGame) => {
            io.socket.broadcast.to(roomID).emit('game active', activeGame)
        })

        socket.on("darw card", (players) => {
            io.to(roomID).emit('darw card', players)
        })


    })


}
module.exports = socketConfig
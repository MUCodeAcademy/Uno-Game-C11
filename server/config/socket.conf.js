function socketConfig(io) {
  io.on("connection", (socket) => {
    const { roomID, username } = socket.handshake.query;
    let roomCount = io.sockets.adapter.rooms.get(roomID)?.size;

    socket.join(roomID);

    io.to(roomID).emit("user join", { username });

    socket.on("new message", ({ body }) => {
      io.to(roomID).emit("new message", { username, body });
    });

    socket.on("", (cards) => {
      io.to(username).emit("send cards", cards);
    });

    socket.on("end turn", () => {
      io.to(roomID).emit("end turn");
    });

    socket.on("start game", (start) => {
      io.to(roomID).emit("start game", start);
    });

    socket.on("disconnect", () => {
      io.to(roomID).emit("user left", { username });
    });
  });
}
module.exports = socketConfig;

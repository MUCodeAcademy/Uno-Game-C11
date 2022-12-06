
const rooms = ["game-1", "game-2", "game-3", "game-4"]
function socketConfig(io) {
  io.on("connection", (socket) => {
    const { roomID, username, uid } = socket.handshake.query;
    if (roomID) {
      if (roomID !== "undefined" && !rooms.includes(roomID)) {
        rooms.push(roomID)
      }
    }

    socket.join(roomID);
    let roomCount = parseInt(io.sockets.adapter.rooms.get(roomID)?.size)
    io.to(socket.id).emit("host check", roomCount);

    for (let i = 4; i <= rooms.length; i++) {
      if (io.sockets.adapter.rooms.get(rooms[i]) == undefined) {
        rooms.pop(rooms[i])
      }
    }

    io.to(socket.id).emit("rooms", rooms)

    io.to(roomID).emit("user connect", { username, uid });



    socket.on("new message", ({ body }) => {
      io.to(roomID).emit("new message", { username, body });
    });

    socket.on(
      "end turn",
      ({ players, discardDeck, activeCard, isReverse, turn, playDeck }) => {
        io.to(roomID).emit("end turn", {
          players,
          discardDeck,
          activeCard,
          isReverse,
          turn,
          playDeck,
        });
      }
    );

    socket.on("start game", ({ players, playDeck, activeCard }) => {
      io.to(roomID).emit("start game", { players, playDeck, activeCard });
    });


    socket.on("disconnect", () => {
      io.to(roomID).emit("user disconnect", { username });

    });

    socket.on("game active", (activeGame) => {
      io.socket.broadcast.to(roomID).emit("game active", activeGame);
    });

    socket.on("draw card", ({ players, playDeck, turn, draws }) => {
      io.to(roomID).emit("draw card", { players, playDeck, turn, draws });
    });
  });

  //game socket
}
module.exports = socketConfig;

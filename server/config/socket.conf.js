function socketConfig(io) {
  const startingRooms = ["game-1", "game-2", "game-3", "game-4"];
  let rooms = [
    { id: "game-1", isPrivate: false, activeGame: false },
    { id: "game-2", isPrivate: false, activeGame: false },
    { id: "game-3", isPrivate: false, activeGame: false },
    { id: "game-4", isPrivate: false, activeGame: false },
  ];
  io.on("connection", (socket) => {
    let isHost = false;
    const { roomID, username, uid } = socket.handshake.query;
    let roomCount = parseInt(io.sockets.adapter.rooms.get(roomID)?.size);
    if (roomID) {
      socket.join(roomID);
      isHost = isNaN(roomCount);
      let activeGame = rooms.filter((r) => (r.id = roomID))[0].isActive;
      io.to(roomID).emit("user connect", {
        username,
        uid,
        isHost,
        activeGame,
      });
    }

    if (!roomID) {
      io.to(socket.id).emit("rooms", { rooms });
    }

    socket.on("new message", ({ body }) => {
      io.to(roomID).emit("new message", { username, body });
    });

    socket.on("create room", ({ id, isPrivate }) => {
      io.to(roomID).emit("create room", { id, isPrivate });
      rooms.push({ id, isPrivate, isActive: false });
      io.emit("rooms", { rooms });
    });

    socket.on(
      "end turn",
      ({
        players,
        discardDeck,
        activeCard,
        newActiveCard,
        isReverse,
        turn,
        playDeck,
      }) => {
        io.to(roomID).emit("end turn", {
          players,
          discardDeck,
          activeCard,
          newActiveCard,
          isReverse,
          turn,
          playDeck,
        });
      }
    );

    socket.on("start game", ({ players, playDeck, activeCard }) => {
      rooms.map((r) => {
        if (r.id === roomID) {
          return { ...r, activeGame: true };
        }
        return r;
      });
      io.emit("rooms", { rooms });
      io.to(roomID).emit("start game", { players, playDeck, activeCard });
    });

    socket.on("end game", ({ message }) => {
      rooms.map((r) => {
        if (r.id === roomID) {
          return { ...r, activeGame: false };
        }
        return r;
      });
      io.emit("rooms", { rooms });
      io.to(roomID).emit("end game", { message });
    });

    socket.on("disconnect", () => {
      if (roomID) {
        io.to(roomID).emit("user disconnect", { username, uid });
        let roomCount = parseInt(io.sockets.adapter.rooms.get(roomID)?.size);
        if (isNaN(roomCount) && !startingRooms.includes(roomID)) {
          rooms = rooms.filter((room) => room.id !== roomID);
        }
        if (isNaN(roomCount) && startingRooms.includes(roomID)) {
          rooms = rooms.map((v) => {
            if (roomID === v.id) {
              return { ...v, activeGame: false };
            }
            return v;
          });
        }

        io.emit("rooms", { rooms });
      }
    });

    socket.on(
      "draw card",
      ({
        players,
        playDeck,
        turn,
        draws,
        activeCard,
        discardDeck,
        isReverse,
      }) => {
        io.to(roomID).emit("draw card", {
          players,
          playDeck,
          turn,
          draws,
          activeCard,
          discardDeck,
          isReverse,
        });
      }
    );
  });
}
module.exports = socketConfig;

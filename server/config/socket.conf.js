function socketConfig(io) {
  const startingRooms = ["game-1", "game-2", "game-3", "game-4"];
  let rooms = [
    { id: "game-1", isPrivate: false, activeGame: false, playerCount: 0 },
    { id: "game-2", isPrivate: false, activeGame: false, playerCount: 0 },
    { id: "game-3", isPrivate: false, activeGame: false, playerCount: 0 },
    { id: "game-4", isPrivate: false, activeGame: false, playerCount: 0 },
  ];
  io.on("connection", (socket) => {
    let isHost = false;
    const { roomID, username, uid } = socket.handshake.query;
    if (roomID) {
      let roomCount = parseInt(io.sockets.adapter.rooms.get(roomID)?.size);
      roomCount = isNaN(roomCount) ? 1 : roomCount + 1;
      socket.join(roomID);
      isHost = roomCount === 1;
      const i = rooms.findIndex((r) => r.id === roomID);
      rooms[i].playerCount = rooms[i].playerCount + 1;
      io.emit("rooms", { rooms });
      let activeGame = rooms[i].isActive;
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
      rooms.push({ id, isPrivate, isActive: false, playerCount: 0 });
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
              return { ...v, activeGame: false, playerCount: 0 };
            }
            return v;
          });
        }

        if (!isNaN(roomCount)) {
          const i = rooms.findIndex((r) => r.id === roomID);

          rooms[i].playerCount = rooms[i].playerCount - 1;
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
      io.to(roomID).emit("start game", { players, playDeck, activeCard });
    });

    socket.on("force disconnect", () => {
      io.to(roomID).emit("user disconnect", { username, uid });
    });
  });
}
module.exports = socketConfig;

function socketConfig(io) {
    const startingRooms = ["Game 1", "Game 2", "Game 3", "Game 4"];
    let rooms = [
        { name: "Game 1", isPrivate: false, playerCount: 0 },
        { name: "Game 2", isPrivate: false, playerCount: 0 },
        { name: "Game 3", isPrivate: false, playerCount: 0 },
        { name: "Game 4", isPrivate: false, playerCount: 0 },
    ];
    io.on("connection", (socket) => {
        let isHost = false;
        const { roomID, username, uid } = socket.handshake.query;
        let roomCount = parseInt(io.sockets.adapter.rooms.get(roomID)?.size);
        roomCount = isNaN(roomCount) ? 1 : roomCount + 1;
        if (roomID) {
            socket.join(roomID);
            if (!rooms.some((r) => r.name === roomID)) {
                //if room dosn't already exist
                rooms.push({ name: roomID, isPrivate: false, playerCount: roomCount });
                io.emit("rooms", { rooms });
            } else {
                //if room already exists, increment playerCount for specific room object
                const i = rooms.findIndex((r) => r.name === roomID);
                rooms[i].playerCount = rooms[i].playerCount + 1;
                io.emit("rooms", { rooms });
            }
            isHost = roomCount === 1 ? true : false;
            io.to(roomID).emit("user connect", { username, uid, isHost });
        }
        if (!roomID) {
            io.to(socket.id).emit("rooms", { rooms });
        }

        socket.on("new message", ({ body }) => {
            io.to(roomID).emit("new message", { username, body });
        });

        socket.on("end turn", ({ players, discardDeck, activeCard, newActiveCard, isReverse, turn, playDeck }) => {
            io.to(roomID).emit("end turn", {
                players,
                discardDeck,
                activeCard,
                newActiveCard,
                isReverse,
                turn,
                playDeck,
            });
        });

        socket.on("start game", ({ players, playDeck, activeCard }) => {
            io.to(roomID).emit("start game", { players, playDeck, activeCard });
        });

        socket.on("end game", ({ message }) => {
            io.to(roomID).emit("end game", { message });
        });

        socket.on("disconnect", () => {
            io.to(roomID).emit("user disconnect", { username, uid });
            if (roomID) {
                if (!startingRooms.includes(roomID)) {
                    if (roomCount >= 1) {
                        const i = rooms.findIndex((r) => r.name === roomID);
                        rooms[i].playerCount = rooms[i].playerCount - 1;
                    } else {
                        rooms = rooms.filter((val) => val !== roomID);
                    }
                } else {
                    const i = rooms.findIndex((r) => r.name === roomID);
                    rooms[i].playerCount = rooms[i].playerCount - 1;
                }
                io.emit("rooms", { rooms });
            }
        });

        socket.on("force disconnect", () => {
            io.to(roomID).emit("user disconnect", { username, uid });
        });

        socket.on("game active", (activeGame) => {
            io.socket.broadcast.to(roomID).emit("game active", activeGame);
        });

        socket.on("draw card", ({ players, playDeck, turn, draws, activeCard, discardDeck, isReverse }) => {
            io.to(roomID).emit("draw card", {
                players,
                playDeck,
                turn,
                draws,
                activeCard,
                discardDeck,
                isReverse,
            });
        });

        socket.on("end turn", ({ players, discardDeck, activeCard, newActiveCard, isReverse, turn, playDeck }) => {
            io.to(roomID).emit("end turn", {
                players,
                discardDeck,
                activeCard,
                newActiveCard,
                isReverse,
                turn,
                playDeck,
            });
        });

        socket.on("start game", ({ players, playDeck, activeCard }) => {
            io.to(roomID).emit("start game", { players, playDeck, activeCard });
        });

        socket.on("end game", ({ message }) => {
            io.to(roomID).emit("end game", { message });
        });

        // socket.on("disconnect", () => {
        //     io.to(roomID).emit("user disconnect", { username, uid });
        //     if (roomID) {
        //         let roomCount = parseInt(io.sockets.adapter.rooms.get(roomID)?.size);
        //         if (isNaN(roomCount) && !startingRooms.includes(roomID)) {
        //             rooms = rooms.filter((val) => val !== roomID);
        //             io.emit("rooms", { rooms });
        //         }
        //     }
        // });

        socket.on("game active", (activeGame) => {
            io.socket.broadcast.to(roomID).emit("game active", activeGame);
        });

        socket.on("draw card", ({ players, playDeck, turn, draws, activeCard, discardDeck, isReverse }) => {
            io.to(roomID).emit("draw card", {
                players,
                playDeck,
                turn,
                draws,
                activeCard,
                discardDeck,
                isReverse,
            });
        });
    });
}
module.exports = socketConfig;

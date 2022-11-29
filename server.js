const express = require("express");
const http = require("http")
const socketID = require("socket.io")
const app = express();
const PORT = 8080
const server = http.createServer(app);
const io = socketID(server, {
    cors: {
        oragin: "*"
    }
})

const socketConfig = require("./server/config/socket.conf")

socketConfig(io)

app.get("/", (req, res) => {
    return res.send("Hello")
});
server.listen(PORT, () => console.log(`Backend listening on port: ${PORT}`));
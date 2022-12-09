const express = require("express");
const http = require("http");
const socketID = require("socket.io");
const app = express();
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketID(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(__dirname + "/build"));
app.use(express.json());

const socketConfig = require("./server/config/socket.conf");

socketConfig(io);

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use((req, res, next) => {
    req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
  });
}

app.get("*", (req, res) => {
  return res.sendFile(__dirname + "/build/index.html");
});

server.listen(PORT, () => console.log(`Backend listening on port: ${PORT}`));

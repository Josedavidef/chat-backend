const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"  // Permite que cualquier frontend se conecte
  }
});

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Reenvía el mensaje a todos
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

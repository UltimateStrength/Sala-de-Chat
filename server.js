/* ===============================
   Constantes / Imports
================================ */

const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

/* ===============================
   Inicialização
================================ */

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server);

/* ===============================
   Porta (Render / Railway / Local)
================================ */

const PORT = process.env.PORT || 1234;

/* ===============================
   Arquivos estáticos
================================ */

const publicDirectoryPath = path.join(__dirname, "public");
app.use(express.static(publicDirectoryPath));

/* ===============================
   Socket.IO - Chat
================================ */

io.on("connection", (socket) => {

    socket.on("newuser", (username) => {
        socket.broadcast.emit("update", `${username} entrou na conversa!`);
        console.log(`${username} entrou`);
    });

    socket.on("exituser", (username) => {
        socket.broadcast.emit("update", `${username} saiu da conversa!`);
        console.log(`${username} saiu`);
    });

    socket.on("chat", (message) => {
        socket.broadcast.emit("chat", message);
        console.log("Mensagem:", message);
    });

    socket.on("image", (data) => {
        io.emit("image", data);
        console.log("Imagem recebida");
    });

});

/* ===============================
   Start do Servidor
================================ */

server.listen(PORT, "0.0.0.0", () => {
    console.log(`
==========================================
Servidor iniciado com sucesso 🚀
Porta: ${PORT}
==========================================
`);
});

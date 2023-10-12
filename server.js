const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " Entrou na Conversa!")
    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " Saiu da Conversa!")
    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
});

server.listen(PORT, () => {
    console.log(`⠀`);
    console.log(`Servidor Iniciado com Sucesso!`);
    console.log(`Porta do Servidor: ${PORT}`);
    console.log(`⠀`);
//  console.log(`------------------------------------------`);
//  console.log(`⠀`);
//  console.log(`Para entrar clique aqui: <http://localhost:${PORT}/>`)
//  console.log(`⠀`);
});
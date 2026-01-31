/* Constantes de Pacotes/Portas/Funções */

// Pacote Express (Framework para Aplicativos Web)
const express = require("express");
// Módulo "path" (Fornece Funções para Mexer com Caminhos de Arquivos e Pastas)
const path = require("path");

// Pacote SocketIO (Framework para Aplicativos com Javascript)
// Fornece uma Biblioteca para Comunicação em Tempo Real via Websockets.
const socketIO = require("socket.io");
// Módulo "http" (do Node.js, é Usado para Criar e Gerenciar Servidores Web.)
const http = require("http");

// Instancia do App Express
const app = express();
// Criador de Server em HTTP usando o App Express
const server = require("http").createServer(app);
// Importa e Configura o Socket.IO para Utilizar o Servidor Criado
const io = require("socket.io")(server);

// Define Porta do Servidor
// (Obs: Tentei usar "process.env.port" para usar a Vercel, que Não Funcionou)
const PORT = process.env.PORT || 1234;

/* Caminho de Arquivos/Pastas */

// Define Qual é a Pasta Raiz para os Arquivos Estáticos (que é a "public)
const publicDirectoryPath = path.join(__dirname, "public");

// Serve os Arquivos Estáticos
app.use(express.static(publicDirectoryPath));

/* Passagem de Informações do Site para o Servidor */

io.on("connection", function(socket){
    // Mensagem Quando um Usuário Entra no Chat
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " Entrou na Conversa!")
        console.info(username + " Entrou na Conversa!");

    });

    // Mensagem Quando um Usuário Sai do Chat
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " Saiu da Conversa!")
        console.info(username + " Saiu da Conversa!");

    });

    // Mensagens que o Usuário Envia no Chat
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
        console.info(message);

    });

    // Imagens que o Usuário Envia no Chat
    socket.on("image", function(data) {
        io.emit("image", data);
        console.info(data);

    });

});

/* Iniciador de Servidor */

server.listen(PORT, () => {
    console.log(`⠀\nServidor Iniciado com Sucesso!\nPorta do Servidor: ${PORT}\n⠀\n------------------------------------------\n⠀\nPara entrar clique aqui: <http://localhost:${PORT}/>`);

});

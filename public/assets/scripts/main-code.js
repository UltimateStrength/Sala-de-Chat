/* IIFE do Código */

    // Informações sobre o que é um IIFE
// Inicia uma Função Anônima Imediatamente Invocada ou (IIFE)
// Que é uma Maneira de Criar um Escopo Isolado para o Código
// Evitando Poluir o Escopo Global
(function() {

    // Selecionador do Elemento com Classe "app" no HTML
    const app = document.querySelector(".app");
    // Objeto de Socket para Comunicação em Tempo Real com o Servidor
    const socket = io();


    // Variavel que Armazena o Nome de Usuário
    let uname;
    
/* Função ao Clicar no Botão "Entrar" do Início */

    app.querySelector(".join-screen #join-user").addEventListener("click", function() {
        // Pega o Valor Colocado na Caixa de Texto
        let username = app.querySelector(".join-screen #username").value;

        // Bloqueia Usuários com Nome em Branco/Nulo
        if (username.length == 0) {
            return;

        }

        // Manda no Chat uma Mensagem (Definida no Server.js Informando a Entrada do Usuário)
        socket.emit("newuser", username);
        // Armazena o Nome de Usuário
        uname = username;

        // Retira da Tela a Area de Registro
        app.querySelector(".join-screen").classList.remove("active");
        // Mostra na Tela a Area de Conversa
        app.querySelector(".chat-screen").classList.add("active");

    });

/* Função ao Clicar no Botão de Enviar Imagem */

    app.querySelector(".chat-screen #select-image").addEventListener("click", function() {
        const imageInput = app.querySelector(".chat-screen #image-input");
        imageInput.click();
    });
    
/* Função ao Selecionar uma Imagem via "Input: File" */

    app.querySelector(".chat-screen #image-input").addEventListener("change", function() {
        const imageInput = this;
        const messageInput = app.querySelector(".chat-screen #message-input");
    
        if (imageInput.files.length > 0) {
            const imageFile = imageInput.files[0];
            const reader = new FileReader();
    
            reader.onload = function(e) {
                const imageData = e.target.result;
                socket.emit("image", {
                    username: uname,
                    image: imageData
                });
    
                messageInput.value = "";
            };
    
            reader.readAsDataURL(imageFile);
        }
    });
    
/* Função ao Clicar no Botão de Enviar Mensagem */

    app.querySelector(".chat-screen #send-message").addEventListener("click", function() {
        // Pega o Valor Colocado na Caixa de Texto
        let message = app.querySelector(".chat-screen #message-input").value;

        // Bloqueia Mensagens em Branco/Nulas
        if (message.length == 0) {
            return;

        }

        // Renderiza a Mensagem na Tela do Usuário
        renderMessage("my", {
            username: uname,
            text: message
            
        });

        // Envia a Mensagem para o Servidor
        socket.emit("chat", {
            username: uname,
            text: message

        });

        // Reseta Caixa de Texto de Envia Mensagens
        app.querySelector(".chat-screen #message-input").value = "";

    });

/* Função ao Clicar no Botão de Sair do Chat */

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function() {
        // Manda no Chat uma Mensagem (Definida no Server.js Informando a Saida do Usuário)
        socket.emit("exituser", uname);
        // Atualiza a Pagina (Resetando Tudo, e Consequentemente Voltando a Tela Inicial)
        window.location.href = window.location.href;

    });

/* Funções Pré-Estabelecidas */

    // Nessa Região, as Funções: "update, chat, image" são Chamadas
    // E ao Serem Chamadas, Executam a Funções Relacionadas ao Nome Delas (Abaixo deste Conteudo)
    socket.on("update", function(update) {
        renderMessage("update", update);

    });

    socket.on("chat", function(message) {
        renderMessage("other", message);

    });

    socket.on("image", function(message) {
        renderMessage("image", message);

    });

/* Função de Renderização de Mensagens */

    function renderMessage(type, message) {
        // Selecionador do Container de Mensagens
        let messageContainer = app.querySelector(".chat-screen .messages");

        // Usada quando a Mensagém É do Usuário!
        if (type == "my") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");

            el.innerHTML = `
                <div>
                    <div class="name">Você</div>
                    <div class="text">${message.text}</div>
                </div>
            `;

            messageContainer.appendChild(el);
            
        }
        
        // Usada quando a Mensagém NÃO É do Usuário!
        else if (type == "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");

            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;

            messageContainer.appendChild(el);

        }

        // Usada quando a Mensagém É uma Imagem!
        else if (type == "image") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");

            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <img src="${message.image}" class="image-message" style="width: 100%;"/>
                </div>
            `;

            messageContainer.appendChild(el);

        }

        // Usada para Atualizar as Mensagens para todos os Usuários!
        else if (type == "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageContainer.appendChild(el);

        }
        
        // Exibe a Região com as Mensagens mais Recentes
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    
    }

})();

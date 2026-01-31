# 💬 Sala de Chat em Tempo Real (Node.js + Socket.IO)

Um chat em tempo real desenvolvido com **Node.js**, **Express** e **Socket.IO**, com suporte a **mensagens de texto**, **envio de imagens** e **nome de usuário personalizado**.

O projeto evoluiu de um chat restrito a `localhost` para uma aplicação **online**, acessível por qualquer pessoa através de um **link público**, sem necessidade de estar na mesma rede.

Para acessar utilize <a href="sala-de-chat.onrender.com/" target="_blank" rel="noopener noreferrer">
  este link 👾
</a>

---

## 🚀 Principais Funcionalidades

- ✅ Chat em tempo real via **WebSocket (Socket.IO)**
- 🧑 Definição de nome de usuário
- 💬 Envio e recebimento de mensagens de texto
- 🖼️ Envio e exibição de imagens no chat
- 🌐 Acesso remoto (não depende da mesma rede)
- 📁 Servidor de arquivos estáticos com Express
- ⚡ Deploy com **Render**
- 🔄 Integração com **GitHub Actions (Node.js CI)**

---

## 🧠 Contexto do Projeto

O modelo antigo deste chat funcionava **apenas em ambiente local (`localhost`)**.  
Para que outras pessoas pudessem acessar, era necessário:

- Estar na **mesma rede**
- Ou utilizar soluções como **Radmin VPN** ou **ZeroTier One**

Com a nova arquitetura:
- Uso de **GitHub Actions (workflows Node.js)** para validação do código
- Hospedagem do servidor via **Render**
- Porta exposta corretamente com `process.env.PORT`

Agora o chat funciona **online**, com **link próprio**, acessível de qualquer lugar 🌍

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Socket.IO**
- **HTML5**
- **CSS3**
- **JavaScript**
- **GitHub Actions**
- **Render**

---

## 📂 Estrutura do Projeto

```txt
Sala-de-Chat/
├─ .github/
│  └─ workflows/
│     └─ node.js.yml
├─ public/
│  ├─ assets/
│  ├─ index.html
│  ├─ code.js
│  ├─ style.css
│  └─ main-style.css
├─ server.js
├─ package.json
├─ package-lock.json
├─ database.json
└─ README.md

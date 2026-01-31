/* Filtro Bloqueador de Inspecionar */

// Bloqueia a Função que o F12 e o CTRL + S Executariam no Site
document.addEventListener("keydown", function (e) {
    if ((e.key === "F12") || (e.key === "s" && e.ctrlKey)) {
        e.preventDefault();

    }

});

// Bloqueia a Função que o Botão Direito do Mouse Executaria no Site
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    
}, false);

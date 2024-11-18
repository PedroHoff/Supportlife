document.addEventListener('DOMContentLoaded', async () => { //adiciona um evento para quando recarregar a página
    const response = await fetch('http://localhost:3000/api/get/postar');
    const result = await response.json();

    document.getElementById("voltar").addEventListener("click", function() {
        window.history.back(); // adiciona o window.history.back no botão para voltar uma página
    });
    if(result.success) {
        const postagensList = document.querySelector('.postagens-list'); // pega a postagens-list 
        result.data.forEach(postar => {  // para cada postagem ele faz um card dentro da postagens-list
            const card = document.createElement('div');
            card.className = 'causa-card';

            const img = document.createElement('img');
            img.src = `http://localhost:3000/uploadsPOSTAGEM/${postar.img}`;
            img.className = 'imagem-postagem';
            img.style.cursor = "pointer";
            img.addEventListener('click', function () {
                window.location.href =  `../publicações/detalhes.html?id=${postar.id}`;
            });

            const infoDiv = document.createElement('div');
            infoDiv.className = 'info';

            const titulo = document.createElement('h3');
            titulo.textContent = postar.titulo;

            const nome = document.createElement('h4');
            nome.textContent = postar.nome;

            
            infoDiv.appendChild(titulo);
            infoDiv.appendChild(nome);

            card.appendChild(img);
            card.appendChild(infoDiv);

            postagensList.appendChild(card);
        });
    } else {
        console.log("Erro", result.sql);
    }
});

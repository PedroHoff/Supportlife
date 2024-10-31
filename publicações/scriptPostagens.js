document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/get/postar');
    const result = await response.json();

    if(result.success) {
        const postagensList = document.querySelector('.postagens-list');
        result.data.forEach(postar => {  // Variável 'postar' em vez de 'post'
            const card = document.createElement('div');
            card.className = 'causa-card';

            const img = document.createElement('img');
            img.src = `http://localhost:3000/uploadsPOSTAGEM/${postar.img}`;
            img.className = 'imagem-postagem';
            img.style.cursor = "pointer"
            img.addEventListener('click', function () {
                window.location.href =  `../publicações/detalhes.html?id=${postar.id}`;
            })

            const infoDiv = document.createElement('div');
            infoDiv.className = 'info';

            const titulo = document.createElement('h3');
            titulo.textContent = postar.titulo;

            // Adicionando elementos ao infoDiv e ao card
            infoDiv.appendChild(titulo);
            
            card.appendChild(img);
            card.appendChild(infoDiv);

            postagensList.appendChild(card);
        });
    } else {
        console.log("Erro", result.sql);
    }
});

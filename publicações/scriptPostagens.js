document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/get/postar');
    const result = await response.json();

    console.log(result);

    if(result.success) {
        const postagensList = document.querySelector('.postagens-list');
        result.data.forEach(postar => {
            const card = document.createElement('div');
            card.className = 'cards'

            const img = document.createElement('img');
            img.src = publicacoes.imagem;

            const causa = document.createElement('h1');
            nome.textContent = publicacoes.causa;

            const necessidade = document.createElement('p');
            necessidade.textContent = publicacoes.necessidade;

            const botão = document.createElement('button')
            botão.className = 'causa_instituição';

            card.appendChild(img)
            card.appendChild(causa)
            card.appendChild(necessidade)
            card.appendChild(botão)

            postagensList.appendChild(card);
        })
    } else {
        console.log("Erro", result.sql)
    }
});
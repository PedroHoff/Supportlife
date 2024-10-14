document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome do usuário armazenado
    const nomeUsuario = localStorage.getItem('nome');
    
    // Se o nome do usuário existir, exibe no perfil
    if (nomeUsuario) {
        document.querySelector('.infos h1').textContent = nomeUsuario; // Atualiza o nome
    } else {
        console.log('Usuário não logado');
    }
})

let button = document.getElementById("submit")

button.onclick = async function() {
    let dataNascimento = document.getElementById("dataNascimento").value;
    let localizacao = document.getElementById("localizacao").value;

    let dados = {foto, dataNascimento, localizacao}

    const response = await fetch('http://localhost:3000/api/store/cadastro2', {
        method: "UPDATE",
        headers: {"Content-type": "application/json;chartset=UTF-8"},
        body: JSON.stringify(dados)
    });
};
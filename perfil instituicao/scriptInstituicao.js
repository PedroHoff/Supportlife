document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome do usuário armazenado
    const nomeUsuario = localStorage.getItem('nome');

    // Se o nome do usuário existir, exibe no perfil
    if (nomeUsuario) {
        document.querySelector('.infos h1').textContent = nomeUsuario; // Atualiza o nome
    } else {
        console.log('Usuário não logado');
    }
});

let button = document.getElementById("editar")

let foto = document.getElementById("foto").value;
let dataNascimento = document.getElementById("dataNascimento").value;
let localizacao = document.getElementById("localizacao").value;

let dados = { foto, dataNascimento, localizacao }

const response = await fetch('http://localhost:3000/api/store/..', {
    method: "POST",
    headers: {"Content-type": "application/json;chartset=UTF-8"},
    body: JSON.stringify(dados)
});

let content = await response.json();

if(content.success){
    alert("Sucesso!")
} else {
    alert("Não deu certo!")
    console.log(content.sql)
};

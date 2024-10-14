document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome do usuário armazenado
    const nomeUsuario = localStorage.getItem('nome');

    // Se o nome do usuário existir, exibe no perfil
    if (nomeUsuario) {
        document.querySelector('.infos h1').textContent = nomeUsuario; // Atualiza o nome
    } else {
        console.log('Usuário não logado');
    }

    // Exibe o formulário ao clicar no botão "Editar"
    document.getElementById('editar').addEventListener('click', () => {
        document.getElementById('formulario').style.display = 'block'; // Exibe o formulário
    });

    // Oculta o formulário ao clicar no botão "Fechar"
    document.getElementById('fecharFormulario').addEventListener('click', () => {
        document.getElementById('formulario').style.display = 'none'; // Oculta o formulário
    });
});


let button = document.getElementById("salvar")

button.onclick = async function() {
    let form  = document.getElementById("formulario");
    let dadosForm  = new FormData(form);


    const response = await fetch('http://localhost:3000/api/store/storePerfil_instituicao', {
        method: "POST",
        body: dadosForm
    })

    let content = await response.json();

    if(content.success){
        alert("Sucesso!")
    } else {
        alert("Não deu certo!")
        console.log(content.sql)
    }
}
let button = document.getElementById('submit');

button.onclick = async function() {    
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let data = { email, senha };
    
    const response = await fetch('http://localhost:3000/api/store/login', {
        method: 'POST',
        headers: { 'Content-Type': "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();

    if (content.success) {
        alert('Usuário logado!');
        localStorage.setItem('user', JSON.stringify(content.data));
        localStorage.setItem('nome', content.data.nome);

        if(content.tipo == 'doador')
            window.location.href = "../perfil doador/principal_usuário.html";
        else
            window.location.href = "../perfil instituicao/principal_instituicao.html";

        
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
        
        
    }else{
        alert('Informações inválidas!');
    }

};
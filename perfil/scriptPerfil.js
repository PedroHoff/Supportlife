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
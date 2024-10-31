let button = document.getElementById('submit');

button.onclick = async function() {    
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let data = { email, senha };

    try {
        const response = await fetch('http://localhost:3000/api/store/login', {
            method: 'POST',
            headers: { 'Content-Type': "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na autenticação'); // Lança erro se não for 200
        }

        let content = await response.json();
 
        if (content.success) {
            alert('Usuário logado!');

            // Armazena as informações do usuário no localStorage
            if (content.tipo === 'doador') {
                localStorage.setItem('doadorId', content.data.id); // ID do doador
            } else {
                localStorage.setItem('userId', content.data.id); // ID da instituição
            }
            localStorage.setItem('nome', content.data.nome);
            
            // Redireciona para a página apropriada
            if (content.tipo === 'doador') {
                window.location.href = "../perfil doador/principal_usuário.html";
            } else {
                window.location.href = "../perfil_instituicao/principal_instituicao.html";
            }
        } else {
            alert('Informações inválidas!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao fazer login. Tente novamente.');
    }
};
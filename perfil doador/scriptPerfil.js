document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome do usuário armazenado
    const nomeUsuario = localStorage.getItem('nome');

    // Se o nome do usuário existir, exibe no perfil
    if (nomeUsuario) {
        document.querySelector('.infos h1').textContent = nomeUsuario; // Atualiza o nome
    } else {
        console.log('Usuário não logado');
    }

    // Função para buscar e exibir os dados do doador
    const fetchDoadorData = async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        try {
            const response = await fetch('http://127.0.0.1:3000/api/store/doador', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                // se sucesso, ele irá exibir os dados na tela nos IDs corretos

                const dataNascimentoOriginal = result.data.dataNascimento.split('T')[0]; // Pega a data e faz um split no T para não aparecer o tempo com a data

                // Converte para o formato dia-mês-ano
                const dataNascimento = new Date(dataNascimentoOriginal);
                const dia = String(dataNascimento.getDate() + 1).padStart(2, '0');
                const mes = String(dataNascimento.getMonth() + 1).padStart(2, '0'); // Lembre-se de adicionar 1 ao mês
                const ano = dataNascimento.getFullYear();

                // Formato dia-mês-ano
                const dataFormatada = `${dia}-${mes}-${ano}`;

                // Exibe a data de nascimento
                const elementoDataNascimento = document.getElementById('datadeNascimento');
                elementoDataNascimento.textContent += ` ${dataFormatada}`; // Pega o que estava escrito por padrão no lugar e acrescenta a data

                // Exibe a localização
                document.getElementById('local').textContent = result.data.localizacao; // Exibe localização

                // Exibe a imagem de perfil
                if (result.data.imagem) {
                    document.getElementById('imagem_perfil').style.backgroundImage = `url('http://127.0.0.1:3000/uploads/${result.data.imagem}')`;
                }
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do perfil:', error);
        }
    };

    // Chama a função para buscar os dados ao carregar a página
    fetchDoadorData();

    // Exibe o formulário ao clicar no botão "Editar"
    document.getElementById('editar').addEventListener('click', () => {
        document.getElementById('formulario').style.display = 'block'; // Exibe o formulário
    });

    // Oculta o formulário ao clicar no botão "Fechar"
    document.getElementById('fecharFormulario').addEventListener('click', () => {
        document.getElementById('formulario').style.display = 'none'; // Oculta o formulário
    });

    // Função para salvar os dados do perfil
    let button = document.getElementById("salvar");

    // Verifique se o botão está presente
    if (button) {
        button.onclick = async function(event) {
            event.preventDefault(); // Evita que o formulário seja enviado de forma padrão
            let form = document.getElementById("formulario");
            let dadosForm = new FormData();

            // Pega os valores do formulário
            const dataNascimento = form.querySelector('input[name="dataNascimento"]').value;
            const localizacao = form.querySelector('input[name="localizacao"]').value;

            // Adiciona apenas os campos necessários ao FormData
            dadosForm.append('dataNascimento', dataNascimento);
            dadosForm.append('localizacao', localizacao);

            // Recupera o token armazenado no localStorage
            const token = JSON.parse(localStorage.getItem('user')).token;

            try {
                const response = await fetch('http://127.0.0.1:3000/api/store/doador', {  
                    method: "POST",
                    body: dadosForm,
                    headers: {
                        'Authorization': `Bearer ${token}`  // Inclui o token no cabeçalho
                    }
                });
                
                let content = await response.json();
        
                if (content.success) {
                    alert("Perfil atualizado com sucesso!");
                    document.getElementById('formulario').style.display = 'none'; // Fecha o formulário após salvar
                    location.reload(); // Recarrega a página para mostrar os dados atualizados
                } else {
                    alert("Erro ao atualizar o perfil");
                    console.log(content.error);
                }
            } catch (error) {
                console.error('Erro ao atualizar o perfil:', error);
            }
        };        
    }
});
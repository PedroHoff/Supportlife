document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome do usuário armazenado
    const nomeUsuario = localStorage.getItem('nome');

    // Se o nome do usuário existir, exibe no perfil
    if (nomeUsuario) {
        document.querySelector('.infos h1').textContent = nomeUsuario; // Atualiza o nome
    } else {
        console.log('Usuário não logado');
    }

    // Função para buscar e exibir os dados da instituição
    const fetchInstituicaoData = async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        try {
            const response = await fetch('http://127.0.0.1:3000/api/store/instituicao', {
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

                // Exibe a datadenascimento
                const elementoDataNascimento = document.getElementById('datadeNascimento');
                elementoDataNascimento.textContent += ` ${dataFormatada}`; // Pega o que estava escrito por padrão no lugar e acrescenta a data

                // Exibe a localização
                document.getElementById('local').textContent = result.data.localizacao; // Exibe localização


                document.getElementById('imagem_perfil').img.src = `url('http://localhost:3000/uploads/${instituicao.imagem}')`;

            }
        } catch (error) {
            console.error('Erro ao buscar os dados do perfil:', error);
        }
    };

    // Chama a função para buscar os dados ao carregar a página
    fetchInstituicaoData();

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
            let dadosForm = new FormData(form);

            // Verifica se o campo de data existe e faz o split no 'T' para enviar apenas a data
            const dataNascimento = dadosForm.get('dataNascimento');
            if (dataNascimento) {
                const dataAjustada = dataNascimento.split('T')[0]; // Quebra no 'T' e mantém somente a data
                dadosForm.set('dataNascimento', dataAjustada); // Substitui no FormData
            }

            // Recupera o token armazenado no localStorage
            const token = JSON.parse(localStorage.getItem('user')).token;

            const response = await fetch('http://127.0.0.1:3000/api/store/instituicao', {  
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
                location.reload();
                // Após salvar, busca os dados atualizados para exibir
                fetchInstituicaoData();
            } else {
                alert("Erro ao atualizar o perfil");
                console.log(content.error);
            }
        };        
    }
});
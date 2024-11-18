document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome do usuário armazenado
    const nomeUsuario = localStorage.getItem('nome');

    // Se o nome do usuário existir, exibe no perfil
    if (nomeUsuario) {
        document.querySelector('.infos h1').textContent = nomeUsuario; // Atualiza o nome
    } else {
        console.log('Usuário não logado');
    }
    document.getElementById("voltar").addEventListener("click", function() {
        window.history.back();
    });

    // Função para buscar e exibir os dados da instituição
    const fetchInstituicaoData = async () => {
        const userId = localStorage.getItem('userId'); 
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/store/instituicao/${userId}`, {
                method: 'GET'
            });

            if (!response.ok) { // se der erro ele exibe o status do servidor do servidor
                throw new Error(`Erro: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                const perfil = result.data;
                const dataNascimentoOriginal = result.data.dataNascimento.split('T')[0]; // split da string para separar a data e o horário, pegando apenas a parte da data ('YYYY-MM-DD').
                const dataNascimento = new Date(dataNascimentoOriginal); // declara que dataNascimento é a data correta
                const dia = String(dataNascimento.getDate() + 1).padStart(2, '0'); // pega o dia e acrescenta 1 para não ter erro na exibição
                const mes = String(dataNascimento.getMonth() + 1).padStart(2, '0'); // pega o mes e acrescenta 1 para não ficar janeiro como mes 0 e dezembro mes 11
                const ano = dataNascimento.getFullYear(); // pega o ano
                const dataFormatada = `${dia}-${mes}-${ano}`; // formata a data para não ficar no padrão YYYY-MM-DD

                document.getElementById('datadeNascimento').textContent += ` ${dataFormatada}`; // adiciona as coisas nas variáveis
                document.getElementById('local').textContent = result.data.localizacao;
                document.getElementById('foto_perfil').style.backgroundImage = `url('http://localhost:3000/uploads/${result.data.imagem}')`;

                if (perfil.Instagram) document.getElementById('link_instagram').href = perfil.Instagram;
                if (perfil.Facebook) document.getElementById('link_facebook').href = perfil.Facebook;
                if (perfil.Twitter) document.getElementById('link_twitter').href = perfil.Twitter;
                if (perfil.LinkedIn) document.getElementById('link_linkedin').href = perfil.LinkedIn;

            } else {

            console.error('Erro ao carregar o perfil:', data.message);
            }

        } catch (error) {
            console.error('Erro ao buscar os dados do perfil:', error);
        }
    };

    
    fetchInstituicaoData(); // Chama a função para buscar os dados ao carregar a página

    // Exibe o formulário ao clicar no botão "Editar"
    const editarButton = document.getElementById('editar');
    if (editarButton) {
        editarButton.addEventListener('click', () => {
            document.getElementById('formulario').style.display = 'block'; // Exibe o formulário
        });
    } else {
        console.log('Botão "Editar" não encontrado');
    }

    // Oculta o formulário ao clicar no botão "Fechar"
    const fecharButton = document.getElementById('fecharFormulario');
    if (fecharButton) {
        fecharButton.addEventListener('click', () => {
            document.getElementById('formulario').style.display = 'none'; // Oculta o formulário
        });
    } else {
        console.log('Botão "Fechar" não encontrado');
    }

    // Função para salvar os dados do perfil
    const button = document.getElementById("salvar");

   
    if (button) {  // Verifique se o botão está presente
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

            const userId = localStorage.getItem('userId'); // Recupera o ID do usuário

            try {
                const response = await fetch(`http://127.0.0.1:3000/api/store/instituicao/${userId}`, {
                    method: "POST",
                    body: dadosForm
                });
                
                if (!response.ok) { // se não tiver resposta / se der erro na atualização de perfil
                    const errorText = await response.text(); // pega o texto do erro
                    console.error('Erro ao atualizar o perfil:', response.status, errorText); // exibe o texto do erro
                    alert("Erro ao atualizar o perfil: " + response.status);
                    return; // Retorna para evitar continuar com o processamento
                }
                
                let content = await response.json();
                
                if (content.success) {
                    alert("Perfil atualizado com sucesso!");
                    document.getElementById('formulario').style.display = 'none'; // Fecha o formulário após salvar
                    fetchInstituicaoData(); // Busca dados atualizados
                    location.reload();
                } else {
                    alert("Erro ao atualizar o perfil");
                    console.log(content.error);
                }
                
            } catch (error) {
                console.error('Erro ao atualizar o perfil:', error);
            }
        };
    } else {
        console.log('Botão "Salvar" não encontrado');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome do doador armazenado
    const nomeDoador = localStorage.getItem('nome');

    // Se o nome do doador existir, exibe no perfil
    if (nomeDoador) {
        document.querySelector('.infos h1').textContent = nomeDoador; // Atualiza o nome
    } else {
        console.log('Doador não logado');
    }

    // Função para buscar e exibir os dados do doador
    const fetchDoadorData = async () => {
        const doadorId = localStorage.getItem('doadorId'); // Altera para doadorId
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/store/doador/${doadorId}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                const dataNascimentoOriginal = result.data.dataNascimento.split('T')[0];
                const dataNascimento = new Date(dataNascimentoOriginal);
                const dia = String(dataNascimento.getDate() + 1).padStart(2, '0');
                const mes = String(dataNascimento.getMonth() + 1).padStart(2, '0');
                const ano = dataNascimento.getFullYear();
                const dataFormatada = `${dia}-${mes}-${ano}`;

                document.getElementById('datadeNascimento').textContent += ` ${dataFormatada}`;
                document.getElementById('local').textContent = result.data.localizacao;
                document.getElementById('foto_perfil').style.backgroundImage = `url('http://localhost:3000/uploads/${result.data.imagem}')`;
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do perfil:', error);
        }
    };

    // Chama a função para buscar os dados ao carregar a página
    fetchDoadorData();

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

            const doadorId = localStorage.getItem('doadorId'); // Altera para doadorId

            try {
                const response = await fetch(`http://127.0.0.1:3000/api/store/doador/${doadorId}`, {
                    method: "POST",
                    body: dadosForm
                });
                
                if (!response.ok) {
                    const errorText = await response.text(); // Captura a resposta como texto
                    console.error('Erro ao atualizar o perfil:', response.status, errorText);
                    alert("Erro ao atualizar o perfil: " + response.status);
                    return; // Retorna para evitar continuar com o processamento
                }
                
                let content = await response.json();
                
                if (content.success) {
                    alert("Perfil atualizado com sucesso!");
                    document.getElementById('formulario').style.display = 'none'; // Fecha o formulário após salvar
                    fetchDoadorData(); // Busca dados atualizados
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

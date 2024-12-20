document.addEventListener('DOMContentLoaded', function() { //add um evento para quando recarregar a página
 
    
    const urlParams = new URLSearchParams(window.location.search);// Obtém os parâmetros da url da página atual
    
    
    const postarId = urlParams.get("id"); // Pega o valor do parâmetro "id" da URL (representando o ID da publicação)
    
   
    if (postarId) {  // Verifica se o "id" foi encontrado na URL
        // Faz um GET e pega os detalhes da publicação do ID de acordo com o getPostarbyID
        fetch(`http://localhost:3000/api/get/postar/detalhes/${postarId}`)
            .then(response => response.json()) // Converte a resposta da requisição para JSON
            .then(data => {
                
                // Obtém o elemento HTML com o id "detalhes" onde os dados serão inseridos
                const detalhesMain = document.getElementById("detalhes");
                
               
                if (data.success) {
                    // Se a requisição foi bem-sucedida, insere os detalhes da publicação no elemento "detalhes"
                    detalhesMain.innerHTML = `
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Detalhes da Instituição</title>
                        <!-- Link para Font Awesome -->
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                        <link rel="stylesheet" href="detalhes.css"> 
                    </head>
                    <div class="detalhes">
                        <button id="voltar" class="voltar"> Voltar </button>
                        <div class="div1">
                            <div class="foto">
                                <img class="img" src="http://localhost:3000/uploadsPOSTAGEM/${data.data.img}">
                            </div>
                            <div class="infos">
                                <div class="titulo">
                                    <h1>${data.data.titulo}</h1>
                                    <p>${data.data.nome}</p>
                                    <p>${data.data.localizacao}</p>
                                </div>
                                <div class="informacoes">
                                    <p><b>Entenda a causa:</b></p>
                                    <p class="causa">${data.data.causa}</p>
                                </div>                                                 
                            </div>
                        </div>
                        <div class="div2">
                            <div class="dinheiro">
                                <h1><b>Aceitamos doações em dinheiro via:</b></h1><br>
                                <p class="pix"><b>PIX:</b><br></p>
                                <p>${data.data.pix}</p>
                                <br> 
                                <h1>Você também pode nos ajudar com:</h1><br>
                                <p>${data.data.necessidade}</p>
                            </div>
                    
                            <div class="necessidade">
                                <div class="redes">
                                    <h1>Você pode nos seguir nas nossas redes sociais:</h1>
                                    <a href="${data.data.Facebook}" target="_blank" id="link_facebook"><i class="fa-brands fa-square-facebook"></i></a>
                                    <a href="${data.data.Instagram}" target="_blank" id="link_instagram"><i class="fa-brands fa-instagram"></i></a>                              
                                    <a href="${data.data.Twitter}" target="_blank" id="link_twitter"><i class="fa-brands fa-twitter"></i></a>
                                    <a href="${data.data.LinkedIn}" target="_blank" id="link_linkedin"><i class="fa-brands fa-linkedin"></i></a>
                                    <br><br>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;


                    // Adiciona o evento para o botão de voltar
                    document.getElementById("voltar").addEventListener("click", function() {
                        window.history.back();
                    });

                } else {
                    detalhesMain.innerHTML = `Não há detalhes disponíveis.`;
                }

            })
            .catch(error => {
                console.error("Erro ao buscar os detalhes:", error);
            });
    }
});
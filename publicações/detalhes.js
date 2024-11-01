document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postarId = urlParams.get("id");

    if (postarId) {
        fetch(`http://localhost:3000/api/get/postar/detalhes/${postarId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const detalhesMain = document.getElementById("detalhes");
                    detalhesMain.innerHTML =
                    `
                    <div class="detalhes">
                        <button id="voltar" class="voltar"> Voltar </button>
                        <div class="div1">
                            <div class="foto">
                                <img class="img" src="http://localhost:3000/uploadsPOSTAGEM/${data.data.img}">
                            </div>
                            <div class="infos">
                                <div class="titulo">
                                    <h1>${data.data.titulo}</h1>
                                    <p><b></b>${data.data.nome}</p>
                                    <p><b></b> ${data.data.localizacao}</p>
                                </div>
                                <div class="informacoes">
                                    <p> <b>Entenda a causa:</b></p>
                                    <p class="causa"> ${data.data.causa}</p>
                                </div>                                                 
                            </div>
                        </div>
                        <div class="div2">
                            <div class="dinheiro">
                                <h1><b>Aceitamos doações em dinheiro via:</h1><br></b>
                                <p class="pix"><b>PIX:</b><br></p>
                                <p> ${data.data.pix} </p>
                                <br><br>
                                <hr class="hr">
                            </div>
                            <div class="necessidade">
                                <h1>Você também pode nos ajudar com: </h1><br>
                                <p> ${data.data.necessidade}</p>
                            </div>
                        </div>
                    </div>
                    `;

                    // Adiciona o evento para o botão de voltar
                    document.getElementById("voltar").addEventListener("click", function() {
                        window.history.back();
                    });

                } else {
                    const detalhesMain = document.getElementById("detalhes");
                    detalhesMain.innerHTML = `Não há detalhes disponíveis.`;
                }

            })
            .catch(error => {
                console.error("Erro ao buscar os detalhes:", error);
            });
    }
});

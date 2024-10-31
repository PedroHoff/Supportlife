document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postarId = urlParams.get("id");

    if (postarId) {
        fetch(`http://localhost:3000/api/get/postar/detalhes/${postarId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const detalhesMain = document.getElementById("detalhes");
                    detalhesMain.innerHTML = `
                    <div class="detalhes">
                        <button class="voltar"></button>
                        <div class="div1">
                            <div class="foto">
                                <img class="img" src="http://localhost:3000/uploadsPOSTAGEM/${data.data.img}">
                            </div>
                            <div class="infos">
                                <div class="titulo">
                                    <h1>${data.data.titulo}</h1>
                                    <p><b></b>${data.data.nome}</p> <br>
                                </div>
                                <div class="informacoes">
                                <p><b>Localização:</b> ${data.data.localizacao}</p>
                                <p><b>Entenda a causa:</b> ${data.data.causa}</p>
                                </div>                                                 
                            </div>
                        </div>
                        <div class="div2">
                        <p><b>Como você pode ajudar:</b> ${data.data.necessidade}</p>
                        <p><b>PIX:</b> ${data.data.pix}</p>
                        </div>
                    </div>
                    `;
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

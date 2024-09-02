let button = document.getElementById("publicar")

button.onclick = async function() {
    let imagem = document.getElementById("imagem").value;
    let causa = document.getElementById("causa").value;

    let dados = {imagem, causa}

    const response = await fetch('http://localhost:3000/api/store/publicar', {
        method: "POST",
        headers: {"Content-type": "application/json;chartset=UTF-8"},
        body: JSON.stringify(dados)
    })

    let content = await response.json();

    if(content.success){
        alert("Sucesso!")
    } else {
        alert("Não deu certo!")
        console.log(content.sql)
    }
}
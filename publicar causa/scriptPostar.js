let button = document.getElementById("publicar")

button.onclick = async function() {
    let imagem = document.getElementById("causaimg").value;
    let causa = document.getElementById("causa").value;
    let necessidade = document.getElementById("necessidade").value;

    let dados = {imagem, causa, necessidade}

    const response = await fetch('http://localhost:3000/api/store/postar', {
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
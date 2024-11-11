let button = document.getElementById("botão1")

button.onclick = async function() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let dados = {nome, email, senha}

    const response = await fetch('http://localhost:3000/api/store/cadastro2', {
        method: "POST",
        headers: {"Content-type": "application/json;chartset=UTF-8"},
        body: JSON.stringify(dados)
    })

    let content = await response.json();

    if(content.success){
        alert("Sucesso!")
        window.location.href = "../login/entrar.html";
    } else {
        alert("Não deu certo!")
        console.log(content.sql)
    }
}
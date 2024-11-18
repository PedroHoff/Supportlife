let button = document.getElementById('enviar');

document.getElementById("voltar").addEventListener("click", function() {
    window.history.back(); 
});

// quando clicar em enviar
button.onclick = async function() {  
    // Previne o comportamento padrão do botão
    event.preventDefault();

   
    let form = document.getElementById("formulario"); //pega o formulário
    let dadosForm = new FormData(form); // cria o FormData com os dados do formulario

    let usuarioId = localStorage.getItem('userId'); // pega o userId do localstorage
   
    dadosForm.append('userId', usuarioId);  // Adiciona o "userId" no FormData para enviar junto com os dados do formulário

    // Envia os dados do formulário (incluindo o "userId") para o servidor 
    const response = await fetch('http://localhost:3000/api/store/postar', { 
        method: "POST",  
        body: dadosForm  // dadosForm pois é onde a gente salvou os dados do formulário
    });

    
    let content = await response.json(); // Converte a resposta da requisição em formato JSON


    if(content.success) {
        alert("Sucesso!");
    } else {
        alert("Não foi criado!");
        console.log(content.sql);
    }
}

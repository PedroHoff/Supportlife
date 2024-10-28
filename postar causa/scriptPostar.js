let button = document.getElementById('enviar');

button.onclick = async function() {
    event.preventDefault();
    let form = document.getElementById("formulario");
    let dadosForm = new FormData(form);
    let usuario = JSON.parse(localStorage.getItem('user'));
    
    dadosForm.append('userId', usuario.id)

    const response = await fetch('http://localhost:3000/api/store/postar', {
        method: "POST",
        body: dadosForm
    })
    
    let content = await response.json();

    if(content.success) {
        alert("Sucesso!")
    } else {
        alert("Não foi criado!")
        console.log(content.sql);
    }
}
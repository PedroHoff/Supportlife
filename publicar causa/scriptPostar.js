let button = document.getElementById("publicar")

button.onclick = async function () {
    let form = document.getElementById('formulario');
    let dadosForm = new FormData(form); 
    let usuario = JSON.parse(localStorage.getItem('user'));

    dadosForm.append('userId', usuario.id)
    //cria agrupado de dados

    const response = await fetch('http://localhost:3000/api/store/postar', {
        method: 'POST',
        body: dadosForm
    });

    let content = await response.json();

    if (content.success) {
        alert('Postado com sucesso!')
    } else {
        alert('Ocorreu um erro');
    }
}
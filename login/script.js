let button = document.getElementById('submit');

button.onclick = async function(){    
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let data = {email,senha}
    
    const response = await fetch('http://localhost:3000/api/store/login', {
        method: 'POST',
        headers: {'Content-type': "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    let content = await response.json();

    
    if(content.success){
        alert('Usuário logado!');
        localStorage.setItem('user', JSON.stringify(content.data))
        // /window.location.replace("../perfil/principal_usuário.html")
    }else{
        alert('Informações inválidas!');
    }
}
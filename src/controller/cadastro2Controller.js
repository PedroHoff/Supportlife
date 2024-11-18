const connection = require('../config/db');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

async function storeCadastro2(request, response) { // Função para armazenar os dados de cadastro da instituicao no banco de dados

    const params = Array( // Cria um array com os dados recebidos
        request.body.nome,
        request.body.email,
        bcrypt.hashSync(request.body.senha, 10)
    );

    const query = "INSERT INTO instituicao(nome, email, senha) VALUES(?, ?, ?)"; // inseri os dados na tabela `instituicao`

    connection.query(query, params, (err, results) => {
        if (results) { // Se estiver tudo certo ele exibe status 200
            response.status(200).json({
                    success: true,
                    message: "Sucesso!",
                    data: results // Dados retornados pelo banco de dados
                })
        } else {
            response.status(400).json({ // Se não, exibe erro
                    success: false,
                    message: "Ops, deu problema!",
                    sql: err,
                })
        }
    })
}
 
module.exports = { // Exporta o storeCadastro2 para poder ser usado em outras partes do projeto
    storeCadastro2
}
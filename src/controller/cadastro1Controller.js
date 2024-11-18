const connection = require('../config/db');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

async function storeCadastro1(request, response) {   // Função para armazenar os dados de cadastro do doador no banco de dados

    const params = Array( // Cria um array com os dados recebidos
        request.body.nome,
        request.body.email,
        bcrypt.hashSync(request.body.senha, 10)
    );

    const query = "INSERT INTO cadastro_doador(nome, email, senha) VALUES(?, ?, ?)"; // inseri os dados na tabela `cadastro_doador`

    connection.query(query, params, (err, results) => {
        if (results) { // Se estiver tudo certo ele exibe status 200
            response.status(200).json({
                    success: true,
                    message: "Sucesso!",
                    data: results
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

module.exports = { // Exporta o storeCadastro1 para poder ser usado em outras partes do projeto
    storeCadastro1
}
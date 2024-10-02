const connection = require('../config/db');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

async function storeCadastro2(request, response) {

    const params = Array(
        request.body.nome,
        request.body.email,
        bcrypt.hashSync(request.body.senha, 10)
    );

    const query = "INSERT INTO instituicao(nome, email, senha) VALUES(?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                })
        } else {
            response.status(400).json({
                    success: false,
                    message: "Ops, deu problema!",
                    sql: err,
                })
        }
    })
}

module.exports = {
    storeCadastro2
}
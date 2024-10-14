const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeInstituicao(request, response) {
    const params = Array(
        request.body.dataNascimento,
        request.body.localizacao,
        request.body.pix
    );

    const query = "INSERT INTO instituicao(dataNascimento, localizacao, pix) VALUES(?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err,
            });
        }
    });
}

async function getInstituicao(request, response) {
    const query = "SELECT * FROM instituicao";

    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err
            });
        }
    });
}

module.exports = {
    storeInstituicao,
    getInstituicao
};
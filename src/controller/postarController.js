const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storePostar(request, response) {

    const params = Array(
        request.body.userId,
        request.body.imagem,
        request.body.causa,
        request.body.necessidade,
        request.body.pix,
        request.body.endereco,
        request.body.nome
    );

    const query = "INSERT INTO publicacao(userId, imagem, causa, necessidade, pix, endereco, nome) VALUES(?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                    success: true,
                    message: "Publicado!",
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

async function getPostar(request, response) {
    const query = "SELECT * FROM publicacao";

    connection.query(query, (err,results) => {
        if(results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err
            })

        }
    })
}

module.exports = {
    storePostar,
    getPostar
}
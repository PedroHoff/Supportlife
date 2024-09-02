const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storePostar(request, response) {

    const params = Array(
        request.body.imagem,
        request.body.causa,
        request.body.necessidade,
    );

    const query = "INSERT INTO publicacoes(imagem, causa, necessidade) VALUES(?, ?, ?)";

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
    const query = "SELECT * FROM publicacoes";

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
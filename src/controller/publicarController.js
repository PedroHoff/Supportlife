const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storePublicar(request, response) {

    const params = Array(
        request.body.imagem,
        request.body.causa
    );

    const query = "INSERT INTO publicar(imagem, causa) VALUES(?, ?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
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

module.exports = {
    storePublicar
}
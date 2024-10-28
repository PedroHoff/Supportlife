const connection = require('../config/db');
const dotenv = require('dotenv').config();


const fs = require('fs')
const path = require('path')


const uploadsPOSTAGEM = path.join(__dirname, '..', 'uploadsPOSTAGEM');

if(!fs.existsSync(uploadsPOSTAGEM)) {
    fs.mkdirSync(uploadsPOSTAGEM);
}
async function storePostar(request, response) {
    const idInstituicao = request.idInstituicao;
    
    if(!request.files) {
        return response.status(400).json({
            success: false,
            message: "Você precisa enviar a foto!"
        });
    }

    const img = request.files.img;
    const imgNome = Date.now() + path.extname(img.name);

    img.mv(path.join(uploadsPOSTAGEM, imgNome), (erro) => {
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo para a pasta!"
            });
        }

        const params = [
            imgNome,
            request.body.titulo,
            request.body.causa,
            request.body.necessidade

        ];

        const query = "INSERT INTO publicacao(img, titulo, causa, necessidade) VALUES(?, ?, ?, ?)";

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
    });
}


async function getPostar(request, response) {
    const query = "SELECT * FROM publicacao";

    connection.query(query, (err, results) => {
        if (results) {
             response.status(200).json({
                 success: true,
                 message: "Sucesso!",
                 data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err,
            })
        }
    })
}

async function getPostarById(request, response) {
    const params = [request.params.id]; 

    const query = "SELECT * FROM publicacao WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (err) { // Verifica se há erro na execução do query
            return response.status(500).json({
                success: false,
                message: "Erro ao consultar o banco de dados.",
                sql: err,
            });
        }

        if (results.length > 0) {
            response.status(200).json({
                success: true,
                data: results[0],
                message: "Sucesso!",
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Publicação não encontrada.",
            });
        }
    });
}

module.exports = {
    storePostar,
    getPostar,
    getPostarById
};
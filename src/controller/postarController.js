const connection = require('../config/db');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const uploadsPOSTAGEM = path.join(__dirname, '..', 'uploadsPOSTAGEM');

if (!fs.existsSync(uploadsPOSTAGEM)) {
    fs.mkdirSync(uploadsPOSTAGEM);
}

async function storePostar(request, response) {
    const userId = request.body.userId; // Obter o userId diretamente do corpo da requisição

    // Verifique se o userId foi fornecido
    if (!userId) {
        return response.status(400).json({
            success: false,
            message: "User ID não fornecido.",
        });
    }

    // Verifique se a instituição existe e obtenha os dados necessários
    const instituicaoQuery = "SELECT nome, localizacao, pix FROM instituicao WHERE id = ?"; // Você deve passar o id da instituição
    connection.query(instituicaoQuery, [userId], (err, instituicaoResults) => { // Aqui, você deve passar o id correto da instituição
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar a instituição.",
                sql: err,
            });
        }

        if (instituicaoResults.length === 0) {
            return response.status(404).json({
                success: false,
                message: "Instituição não encontrada.",
            });
        }

        const { nome, localizacao, pix } = instituicaoResults[0];

        // Continue com o upload da imagem
        if (!request.files || !request.files.img) {
            return response.status(400).json({
                success: false,
                message: "Você precisa enviar a foto!",
            });
        }

        const img = request.files.img;
        const imgNome = Date.now() + path.extname(img.name);

        img.mv(path.join(uploadsPOSTAGEM, imgNome), (erro) => {
            if (erro) {
                return response.status(400).json({
                    success: false,
                    message: "Erro ao mover o arquivo para a pasta!",
                });
            }

            const params = [
                userId,
                imgNome,
                request.body.titulo,
                request.body.causa,
                request.body.necessidade,
                nome,
                localizacao,
                pix
            ];

            const query = "INSERT INTO publicacao(userId, img, titulo, causa, necessidade, nome, localizacao, pix) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";

            connection.query(query, params, (err, results) => {
                if (results) {
                    response.status(200).json({
                        success: true,
                        message: "Sucesso!",
                        data: results,
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

async function getPostarById(request, response) {
    const params = [request.params.id];

    const query = "SELECT * FROM publicacao WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
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
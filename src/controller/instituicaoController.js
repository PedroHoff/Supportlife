const connection = require('../config/db');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Define o caminho para a pasta de uploads
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storeInstituicao(request, response) {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
        return response.status(400).json({ success: false, message: 'Token não fornecido' });
    }

    const imagem = request.files?.imagem;
    let imagemNome = null; // Variável para armazenar o nome da imagem, se existir

    if (imagem) {
        imagemNome = Date.now() + path.extname(imagem.name); // Gera um nome único para a imagem
    }

    try {
        const decoded = jwt.verify(token, 'token');
        const userId = decoded.userId;
        const { dataNascimento, localizacao, pix } = request.body;

        // Move a imagem para a pasta 'uploads' se a imagem existir
        if (imagem) {
            await imagem.mv(path.join(uploadPath, imagemNome));
        }

        const query = "UPDATE instituicao SET imagem = ?, dataNascimento = ?, localizacao = ?, pix = ? WHERE id = ?";
        const params = [imagemNome, dataNascimento, localizacao, pix, userId];

        connection.query(query, params, (err, results) => {
            if (err) {
                return response.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar o perfil',
                    error: err
                });
            }
            return response.status(200).json({
                success: true,
                message: 'Perfil atualizado com sucesso',
                data: { dataNascimento, localizacao, pix, imagem: imagemNome }
            });
        });
    } catch (err) {
        return response.status(400).json({ success: false, message: 'Token inválido' });
    }
}

async function getInstituicao(request, response) {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
        return response.status(400).json({ success: false, message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'token');
        const userId = decoded.userId;

        const query = "SELECT nome, imagem, dataNascimento, localizacao, pix FROM instituicao WHERE id = ?";
        const params = [userId];

        connection.query(query, params, (err, results) => {
            if (err) {
                return response.status(500).json({
                    success: false,
                    message: 'Erro ao obter o perfil',
                    error: err
                });
            }

            if (results.length > 0) {
                return response.status(200).json({
                    success: true,
                    data: results[0]
                });
            } else {
                return response.status(404).json({
                    success: false,
                    message: 'Perfil não encontrado'
                });
            }
        });
    } catch (err) {
        return response.status(400).json({ success: false, message: 'Token inválido' });
    }
}

module.exports = {
    storeInstituicao,
    getInstituicao
};

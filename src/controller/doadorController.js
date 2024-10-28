const connection = require('../config/db');
const jwt = require('jsonwebtoken');

async function storeDoador(request, response) {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
        return response.status(400).json({ success: false, message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'token');
        const userId = decoded.userId;
        const { dataNascimento, localizacao } = request.body;

        // Verifica se os campos obrigatórios estão presentes
        if (!dataNascimento || !localizacao) {
            return response.status(400).json({ success: false, message: 'Campos obrigatórios não fornecidos' });
        }

        // Atualiza somente dataNascimento e localizacao
        const query = "UPDATE cadastro_doador SET dataNascimento = ?, localizacao = ? WHERE id = ?";
        const params = [dataNascimento, localizacao, userId];

        connection.query(query, params, (err, results) => {
            if (err) {
                return response.status(400).json({
                    success: false,
                    message: 'Erro ao atualizar o perfil',
                    error: err
                });
            }
            return response.status(200).json({
                success: true,
                message: 'Perfil atualizado com sucesso',
                data: { dataNascimento, localizacao }
            });
        });
    } catch (err) {
        return response.status(400).json({ success: false, message: 'Token inválido' });
    }
}

async function getDoador(request, response) {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
        return response.status(400).json({ success: false, message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'token');
        const userId = decoded.userId;

        const query = "SELECT nome, imagem, dataNascimento, localizacao FROM cadastro_doador WHERE id = ?";
        const params = [userId];

        connection.query(query, params, (err, results) => {
            if (err) {
                return response.status(400).json({
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
                return response.status(400).json({
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
    storeDoador,
    getDoador
};
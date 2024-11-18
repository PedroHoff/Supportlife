const connection = require('../config/db');
const fs = require('fs');
const path = require('path');

// Define o caminho para a pasta de uploads
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storeDoador(request, response) {
    const imagem = request.files?.imagem; // pega a imagem enviada
    let imagemNome = null;

    if (imagem) {
        imagemNome = Date.now() + path.extname(imagem.name); // Gera um nome único para a imagem
        await imagem.mv(path.join(uploadPath, imagemNome)); // Move a imagem para a pasta 'uploads'
    }

    const { doadorId } = request.params; // pega o ID do doador a ser atualizado
    const { dataNascimento, localizacao, Facebook, Instagram, Twitter, LinkedIn } = request.body; // pega os dados do formulário

    // Verifica se o ID e os dados foram enviados corretamente
    if (!doadorId || !dataNascimento || !localizacao) {
        return response.status(400).json({
            success: false,
            message: 'Dados incompletos ou inválidos'
        });
    }

    const query = "UPDATE cadastro_doador SET imagem = ?, dataNascimento = ?, localizacao = ?, Facebook = ?, Instagram = ?, Twitter = ?, LinkedIn = ? WHERE id = ?";
    const params = [imagemNome, dataNascimento, localizacao, Facebook, Instagram, Twitter, LinkedIn, doadorId]; 

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err); // Loga o erro
            return response.status(500).json({
                success: false,
                message: 'Erro ao atualizar o perfil',
                error: err // Retorna o erro detalhado
            });
        }
        return response.status(200).json({
            success: true,
            message: 'Perfil atualizado com sucesso',
            data: { dataNascimento, localizacao, Facebook, Instagram, Twitter, LinkedIn, imagem: imagemNome } // armazena os dados em data
        });
    });
}

async function getDoador(request, response) {
    const { doadorId } = request.params; // Captura o ID do doador

    const query = "SELECT nome, imagem, dataNascimento, localizacao, Facebook, Instagram, Twitter, LinkedIn FROM cadastro_doador WHERE id = ?";
    const params = [doadorId]; // Usa doadorId

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
                data: results[0] // Retorna os dados do doador
            });
        } else {
            return response.status(404).json({
                success: false,
                message: 'Perfil não encontrado'
            });
        }
    });
}

module.exports = {
    storeDoador,
    getDoador
};

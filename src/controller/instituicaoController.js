const connection = require('../config/db');
const fs = require('fs');
const path = require('path');

// Define o caminho para a pasta de uploads
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storeInstituicao(request, response) {
    const imagem = request.files?.imagem;

    let imagemNome = null; // Inicializa a variável imagemNome
    if (imagem) {
        imagemNome = Date.now() + path.extname(imagem.name); // Gera um nome único para a imagem
        // Move a imagem para a pasta 'uploads'
        await imagem.mv(path.join(uploadPath, imagemNome));
    }

    // Obtendo o userId diretamente dos parâmetros da URL
    const { userId } = request.params; 
    const { dataNascimento, localizacao, pix, Facebook, Instagram, Twitter, LinkedIn} = request.body; 

    const query = "UPDATE instituicao SET imagem = ?, dataNascimento = ?, localizacao = ?, pix = ?, Facebook = ?, Instagram = ?, Twitter = ?, LinkedIn = ? WHERE id = ?";
    const params = [imagemNome, dataNascimento, localizacao, pix, Facebook, Instagram, Twitter, LinkedIn, userId];

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
            data: { dataNascimento, localizacao, pix, Facebook, Instagram, Twitter, LinkedIn, imagem: imagemNome }
            
        });
    });
}


async function getInstituicao(request, response) {
    // Obtendo o userId diretamente dos parâmetros da URL
    const { userId } = request.params; 

    const query = "SELECT nome, imagem, dataNascimento, localizacao, pix, Facebook, Instagram, Twitter, LinkedIn FROM instituicao WHERE id = ?";
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
}

module.exports = {
    storeInstituicao,
    getInstituicao
};

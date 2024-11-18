const connection = require('../config/db');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const uploadsPOSTAGEM = path.join(__dirname, '..', 'uploadsPOSTAGEM');

if (!fs.existsSync(uploadsPOSTAGEM)) {
    fs.mkdirSync(uploadsPOSTAGEM);
}

async function storePostar(request, response) {
    const userId = request.body.userId; // pega o userId diretamente do corpo da requisição

    if (!userId) { // Verifique se o userId foi pego
        return response.status(400).json({
            success: false,
            message: "User ID não fornecido.",
        });
    }
}
    const instituicaoQuery = "SELECT nome, localizacao, pix, Facebook, Instagram, Twitter, LinkedIn FROM instituicao WHERE id = ?"; 
connection.query(instituicaoQuery, [userId], (err, instituicaoResults) => {  // começa a consulta para buscar as informações da instituição com base no ID fornecido (userId)
    
    
    if (err) {
        // Se ocorrer erro na consulta ao banco de dados, retorna um erro 500 
        return response.status(500).json({
            success: false,
            message: "Erro ao buscar a instituição.",
            sql: err,
        });
    }

    if (instituicaoResults.length === 0) {
        // Se não encontrar resultados, retorna erro 404 informando que a instituição não foi encontrada
        return response.status(404).json({
            success: false,
            message: "Instituição não encontrada.",
        });
    }

    // ele extrai as informações de instituicaoResults e as armazena em variáveis separadas.
    const { nome, localizacao, pix, Facebook, Instagram, Twitter, LinkedIn  } = instituicaoResults[0];

    // Verifica se foi enviado um arquivo de imagem na requisição
    if (!request.files || !request.files.img) {
        // Se não foi, ele volta uma mensagem falando que precisa enviar a imagem
        return response.status(400).json({
            success: false,
            message: "Você precisa enviar a foto!",
        });
    }

    // pega a imagem  e gera um nome único para ela
    const img = request.files.img;
    const imgNome = Date.now() + path.extname(img.name);

    // Move a imagem para a pasta de uploads
    img.mv(path.join(uploadsPOSTAGEM, imgNome), (erro) => {
        if (erro) {
            
            return response.status(400).json({ // Se ocorrer erro ao mover a imagem, retorna erro 400
                success: false,
                message: "Erro ao mover o arquivo para a pasta!",
            });
        }

        // Prepara os parâmetros para inserir a publicação no banco de dados
        const params = [
            userId,
            imgNome,
            request.body.titulo,
            request.body.causa,
            request.body.necessidade,
            nome,
            localizacao,
            pix,
            Facebook,
            Instagram, 
            Twitter, 
            LinkedIn
        ];

        // Define a consulta SQL para inserir os dados da publicação
        const query = "INSERT INTO publicacao(userId, img, titulo, causa, necessidade, nome, localizacao, pix, Facebook, Instagram, Twitter, LinkedIn) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Executa a consulta para inserir a publicação no banco
        connection.query(query, params, (err, results) => {
            if (results) {
                // Se a inserção for bem-sucedida, retorna sucesso com os dados da publicação
                response.status(200).json({
                    success: true,
                    message: "Sucesso!",
                    data: results,
                });
            } else {
                // Se ocorrer erro na inserção, retorna erro 400 com a mensagem de erro
                response.status(400).json({
                    success: false,
                    message: "Erro!",
                    sql: err,
                });
            }
        });
    });
});


async function getPostar(request, response) {
    const query = "SELECT * FROM publicacao"; // seleciona todas as publicações da tabela publicacaoes para poder fazer os cards de cada publicacao

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
    const params = [request.params.id];  // pega o ID da publicação 

    const query = "SELECT * FROM publicacao WHERE id = ?";  // pega uma publicação específica para poder exibir os detalhes
    // consulta pra ver se pega algo
    connection.query(query, params, (err, results) => {  
        if (err) {  
            return response.status(500).json({  
                success: false,
                message: "Erro ao consultar o banco de dados.",
                sql: err,
            });
        }

        if (results.length > 0) {  // Se a publicação for encontrada
            response.status(200).json({  // Retorna os dados da publicação 
                success: true,
                data: results[0],
                message: "Sucesso!",
            });
        } else {  // Se a publicação não for encontrada
            response.status(404).json({  // Retorna um erro com status 404 indicando que não foi encontrada
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
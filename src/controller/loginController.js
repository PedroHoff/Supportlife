const connection = require('../config/db');
require("dotenv").config();
const bcrypt = require('bcrypt');

async function login(request, response) {
    async function login(request, response) {
        // define as queries pra ver se é um doador ou uma instituição pelo email
        const queryDoador = "SELECT * FROM cadastro_doador WHERE `email` = ?"; 
        const queryInstituicao = "SELECT * FROM instituicao WHERE `email` = ?"; 
    }
       
        const params = [request.body.email];  // pega o email
    

    connection.query(queryDoador, params, (errDoador, resultsDoador) => { // verifica o email está no cadastro_doador
        if (errDoador) {
            return response.status(400).send({
                msg: 'Ocorreu um erro na consulta.' //
            });
        }

        if (resultsDoador.length > 0) {
            // Se encontrado em cadastro_doador
            bcrypt.compare(request.body.senha, resultsDoador[0].senha, (err, result) => {
                if (err || !result) {
                    return response.status(400).send({ msg: 'Email ou senha incorretos!' });
                }
                const userData = resultsDoador[0]; // Pega os dados do primeiro doador encontrado na consulta (dados do doador com o email fornecido)
                const doadorId = userData.id; //o doadorId vai ser userData.id pega o id do userData
                delete userData.senha; // Remover a senha 

                return response.status(200).json({
                    success: true,
                    message: 'Sucesso! Usuário conectado.',
                    data: userData, // retorna os dados do usuário(userData) para data.
                    tipo: 'doador',
                    doadorId // Retorna o ID do doador
                });
            });
        } else {
            // Se não encontrado em cadastro_doador, verificar instituicao
            connection.query(queryInstituicao, params, (errInstituicao, resultsInstituicao) => {
                if (errInstituicao) {
                    return response.status(400).send({
                        msg: 'Ocorreu um erro na consulta.'
                    });
                }

                if (resultsInstituicao.length > 0) {
                    // Se encontrado em instituicao
                    bcrypt.compare(request.body.senha, resultsInstituicao[0].senha, (err, result) => {
                        if (err || !result) {
                            return response.status(400).send({ msg: 'Email ou senha incorretos!' });
                        }
                        const userData = resultsInstituicao[0];
                        const userId = userData.id;
                        delete userData.senha; // Remover a senha do objeto

                        return response.status(200).json({
                            success: true,
                            message: 'Sucesso! Usuário conectado.',
                            data: userData, // retorna os dados do usuário(userData) para data.
                            userId // Retorna o ID da instituicao
                        });
                    });
                } else {
                    // Não encontrado em nenhuma das tabelas
                    return response.status(400).send({ msg: 'Email não cadastrado!' });
                }
            });
        }
    });
}

module.exports = {
    login
};

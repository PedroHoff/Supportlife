const connection = require('../config/db');
require("dotenv").config();
const bcrypt = require('bcrypt');

async function login(request, response) {
    const queryDoador = "SELECT * FROM cadastro_doador WHERE `email` = ?";
    const queryInstituicao = "SELECT * FROM instituicao WHERE `email` = ?";
    const params = [request.body.email];

    connection.query(queryDoador, params, (errDoador, resultsDoador) => {
        if (errDoador) {
            return response.status(400).send({
                msg: 'Ocorreu um erro na consulta.'
            });
        }

        if (resultsDoador.length > 0) {
            // Se encontrado em cadastro_doador
            bcrypt.compare(request.body.senha, resultsDoador[0].senha, (err, result) => {
                if (err || !result) {
                    return response.status(400).send({ msg: 'Email ou senha incorretos!' });
                }
                const userData = resultsDoador[0];
                const doadorId = userData.id;
                delete userData.senha; // Remover a senha do objeto

                return response.status(200).json({
                    success: true,
                    message: 'Sucesso! Usuário conectado.',
                    data: userData,
                    tipo: 'doador',
                    doadorId // Retorna o userId
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
                            data: userData,
                            userId // Retorna o userId
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

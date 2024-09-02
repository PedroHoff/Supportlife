const connection = require('../config/db');

require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(request, response) {
    const query = "SELECT * FROM cadastro_doador WHERE `email` = ?";

    const params = Array(
        request.body.email
    );
    



connection.query(query, params, (err, results) => {
        try {
            if (results.length > 0) {
                bcrypt.compare(request.body.senha, results[0].senha, (err, result) => {
                    
                    if (err) {
                        return response.status(401).send({
                            msg: 'Email or password is incorrect!'
                        });
                    } else if (result) {
                        const id = results[0].id;
                        const token = jwt.sign({ userId: id }, 'the-super-strong-secrect', { expiresIn: 300 });
                        results[0]['token'] = token;

                        response
                            .status(200)
                            .json({
                                success: true,
                                message: `Sucesso! Usuário conectado.`,
                                data: results
                            });
                    } else {
                        return response.status(401).send({
                            msg: ' password is incorrect!'
                        });

                    }
                })
            } else {
                return response.status(401).send({
                    msg: 'Email não cadastrado!'
                });

            }
        }
        catch (e) { // Caso aconteça algum erro na execução
        response.status(400).json({
            success: false,
            message: "Ocorreu um erro! ",
            query: err,
            sqlMessage: err
        });
    }
});
}

module.exports = {
    
    login
}
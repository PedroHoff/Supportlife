const { Router } = require('express');
const router = Router();

const { storeCadastro1 } = require('../controller/cadastro1Controller');

router.post('/store/cadastro1', storeCadastro1);


/**
 * @swagger
 * /store/cadastro1:
 *  post:
 *    summary: Cadastro de Usuário
 *    responses:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */


module.exports = router;
 
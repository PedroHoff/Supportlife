const { Router } = require('express');
const router = Router();

const { storeCadastro2 } = require('../controller/cadastro2Controller');

router.post('/store/cadastro2', storeCadastro2);


/**
 * @swagger
 * /store/cadastro2:
 *  post:
 *    summary: Cadastro de Instituição
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
 

 
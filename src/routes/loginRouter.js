
const { Router } = require('express');
const router = Router();
const { login } = require('../controller/loginController');

router.post('/store/login', login);

module.exports = router;

/**
 * @swagger
 * /store/login:
 *  post:
 *    summary: Login de Usuário ou Instituição
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
 
 
const { Router } = require('express');
const router = Router();
const { storeInstituicao, getInstituicao } = require('../controller/instituicaoController'); 

// Rota para criar ou atualizar o perfil da instituição
router.post('/store/instituicao', storeInstituicao);

// Rota para buscar os dados da instituição
router.get('/store/instituicao', getInstituicao); // Mantenha o mesmo caminho para POST e GET

/**
 * @swagger
 * /store/instituicao:
 *  get:
 *    summary: Retorna os dados da instituição
 *    responses:
 *      200:
 *        description: Os dados do perfil da instituição
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    dataNascimento:
 *                      type: string
 *                    localizacao:
 *                      type: string
 */
/**
 * @swagger
 * /store/instituicao:
 *  post:
 *    summary: Retorna os dados da instituição
 *    responses:
 *      200:
 *        description: Os dados do perfil da instituição
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    dataNascimento:
 *                      type: string
 *                    localizacao:
 *                      type: string
 */
module.exports = router;

const { Router } = require('express');
const router = Router();
const { storeInstituicao, getInstituicao } = require('../controller/instituicaoController'); 

// Rota para criar ou atualizar o perfil da instituição com o ID
router.post('/store/instituicao/:userId', storeInstituicao);

// Rota para buscar os dados da instituição com o ID
router.get('/store/instituicao/:userId', getInstituicao); 

/**
 * @swagger
 * /store/instituicao/{userId}:
 *  get:
 *    summary: Retorna os dados da instituição
 *    parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        description: O ID da instituição
 *        schema:
 *          type: string
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
 * /store/instituicao/{userId}:
 *  post:
 *    summary: Atualiza os dados da instituição
 *    parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        description: O ID da instituição
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Os dados do perfil da instituição atualizados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  properties:
 *                    dataNascimento:
 *                      type: string
 *                    localizacao:
 *                      type: string
 */
module.exports = router;

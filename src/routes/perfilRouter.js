const { Router } = require('express');
const router = Router();
const { storeInstituicao, getInstituicao } = require('../controller/perfil_instituicaoController'); // Corrigido para "controllers"

// Rota para criar ou atualizar o perfil da instituição
router.post('/store/instituicao', storeInstituicao);
router.get('/get/instituicao', getInstituicao);

/**
 * @swagger
 * /store/perfil:
 *  get:
 *    summary: Torna o perfil funcional
 *    responses:
 *      200:
 *        description: Uma lista de tarefas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
module.exports = router;

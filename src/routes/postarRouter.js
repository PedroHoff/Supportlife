const { Router } = require('express');
const router = Router();

const { storePostar, getPostar, getPostarById} = require('../controller/postarController');

router.post('/store/postar', storePostar);
router.get('/get/postar', getPostar);

router.get('/get/postar/detalhes/:id', getPostarById);

module.exports = router;

/**
 * @swagger
 * /store/publicar causa:
 *  get:
 *    summary: Faz a publicação de uma causa
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
 
 
 
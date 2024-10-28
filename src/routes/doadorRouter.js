const { Router } = require('express');
const router = Router();

const { storeDoador, getDoador } = require('../controller/doadorController'); 

// Rota para criar ou atualizar o perfil do doador
router.post('/store/doador', storeDoador);

// Rota para buscar os dados do doador
router.get('/store/doador', getDoador); // Mantenha o mesmo caminho para POST e GET

/**
 * @swagger
 * /store/doador:
 *  get:
 *    summary: Retorna os dados do doador
 *    responses:
 *      200:
 *        description: Os dados do perfil do doador
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
 *                    pix:
 *                      type: string
 *                    imagem:
 *                      type: string
 */

module.exports = router;
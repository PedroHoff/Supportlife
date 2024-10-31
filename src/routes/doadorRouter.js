const { Router } = require('express');
const router = Router();
const { storeDoador, getDoador } = require('../controller/doadorController'); 

// Rota para criar ou atualizar o perfil do doador
router.post('/store/doador/:doadorId', storeDoador); // Use doadorId

// Rota para buscar os dados do doador
router.get('/store/doador/:doadorId', getDoador); // Use doadorId

/**
 * @swagger
 * /store/doador/{doadorId}:
 *  get:
 *    summary: Retorna os dados do doador
 *    parameters:
 *      - in: path
 *        name: doadorId
 *        required: true
 *        description: ID do doador
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Os dados do perfil do doador
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
 *                    imagem:
 *                      type: string
 */

module.exports = router;

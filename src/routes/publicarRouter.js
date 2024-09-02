const { Router } = require('express');
const router = Router();

const { storePublicar } = require('../controller/publicarController');

router.post('/store/publicar', storePublicar);

module.exports = router;
const { Router } = require('express');
const router = Router();

const { storeCadastro1 } = require('../controller/cadastro1Controller');

router.post('/store/cadastro1', storeCadastro1);

module.exports = router;
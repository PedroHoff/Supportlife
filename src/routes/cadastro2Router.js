const { Router } = require('express');
const router = Router();

const { storeCadastro2 } = require('../controller/cadastro2Controller');

router.post('/store/cadastro2', storeCadastro2);

module.exports = router;
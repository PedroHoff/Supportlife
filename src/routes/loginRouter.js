
const { Router } = require('express');
const router = Router();
const { login } = require('../controller/loginController');

router.post('/store/login', login);

module.exports = router;
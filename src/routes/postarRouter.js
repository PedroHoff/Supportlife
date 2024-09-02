const { Router } = require('express');
const router = Router();

const { storePostar, getPostar } = require('../controller/postarController');

router.post('/store/postar', storePostar);
router.get('/get/postar', getPostar),

module.exports = router;
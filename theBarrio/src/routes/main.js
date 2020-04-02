// ========== REQUIRE ==========
const express = require('express');
const router = express.Router();

// ========== CONTROLADOR ==========
const mainController = require('../controllers/mainController');


// ========== RUTAS DE USUARIOS ==========

router.get('/', mainController.root);

router.get('/cart', mainController.cart);

module.exports = router;

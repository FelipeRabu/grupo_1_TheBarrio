// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);

router.get('/cart', mainController.cart);

router.get('/registro', mainController.registro);

router.get('/carga-de-productos', mainController.cargaProducto);

router.get('/artistas', mainController.artistas);

module.exports = router;

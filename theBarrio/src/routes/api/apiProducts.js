// ************ Require's ************
const express = require('express');
const router = express.Router();

const apiProductsController = require('../../controllers/api/apiProductsController');


router.get('/', apiProductsController.list); /* GET - All products */

//router.get('/:productId/', apiProductsController.detail); /* GET - Product detail */   


module.exports = router;
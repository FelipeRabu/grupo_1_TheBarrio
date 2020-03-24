// ************ Require's ************
const express = require('express');
const router = express.Router();

const apiProductsController = require('../../controllers/api/apiProductsController');


router.get('/', apiProductsController.list);

router.get('/:productId/', apiProductsController.detail);  



module.exports = router;
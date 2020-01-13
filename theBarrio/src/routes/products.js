// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************

const productsController = require('../controllers/productsController');


router.get('/', productsController.root); /* GET - All products */
router.get('/detail/:productId/', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); /* GET - Form to create */
router.post('/create/', productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
router.put('/edit/:productId', productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.post('/delete/:productId', productsController.destroy); /* DELETE - Delete from DB */
//CAMBIAR ESTO A "delete" EN VEZ DE "post"

module.exports = router;
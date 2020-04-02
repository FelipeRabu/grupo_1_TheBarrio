// ========== REQUIRE ==========
const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator'); //Express validator para validar el back
const path = require('path');
const multer = require('multer');
const methodOverride = require('method-override');

// ========== CONTROLADOR ==========
const productsController = require('../controllers/productsController');

// ========== MULTER ==========
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: function (req, file, cb) {
      let productName = req.body.name.replace(/ /g, '_').toLowerCase();
      let imageFinalName = productName + '_' + Date.now() + path.extname(file.originalname);
	  cb(null, imageFinalName);
    }
  })
  var upload = multer({ storage: storage })

// ========== MIDDLEWARES ==========
const adminMiddleware = require('../middlewares/adminMiddleware');




// ========== RUTAS DE PRODUCTOS ==========

//LISTADO DE PRODUCTOS
router.get('/', productsController.root); /* GET - All products */


//FORMULARIO DE CREACION DE PRODUCTOS
router.get('/create/', adminMiddleware, productsController.create); /* GET - Form to create */ // es .create ?

//CREACION DE PRODUCTOS
router.post('/create/', upload.single('image'),[
    //VALIDACION BACK CREATE 
    check('name').trim().not().isEmpty().withMessage("El nombre no puede estar vacio"),
    check('name').trim().isLength({min:5}).withMessage("El nombre debe tener 5 caracteres"),
    check('fk_category').not().isEmpty().withMessage("La categoria no puede estar vacia"),
    check('fk_color').not().isEmpty().withMessage("El color no puede estar vacio"),
	  check('fk_size').not().isEmpty().withMessage("El talle no puede estar vacio"),
	  check('fk_design').not().isEmpty().withMessage("El diseño no puede estar vacio"),
    check('fk_artist').not().isEmpty().withMessage("El artista no puede estar vacio"),
    check('price').not().isEmpty().withMessage("El precio no puede estar vacio"),
    check('image').custom((value, {req}) => {
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            if (typeof req.file == 'undefined'){
              throw new Error ("El campo de imagen no puede estar vacio")
            } else if (req.file.originalname) {
              let fileExtension = path.extname(req.file.originalname);
              let extensionIsOk = acceptedExtensions.includes(fileExtension);
              if (!extensionIsOk) {
                throw new Error('Los formatos válidos de la imagen de perfil son JPG, JPEG y PNG');
              }
            }
            return true;
            }),
], productsController.store);


//FORMULARIO DE EDICION DE PRODUCTOS
router.get('/edit/:productId', adminMiddleware, productsController.edit);

//EDICION DE PRODUCTOS
router.put('/edit/:productId',upload.single('image'),[
    check('name').not().isEmpty().withMessage("El nombre no puede estar vacio"),
    check('name').isLength({min:5}).withMessage("El nombre debe tener 5 caracteres"),
    check('fk_category').not().isEmpty().withMessage("El categoria no puede estar vacia"),
    check('fk_color').not().isEmpty().withMessage("El color no puede estar vacio"),
	  check('fk_size').not().isEmpty().withMessage("El talle no puede estar vacio"),
	  check('fk_design').not().isEmpty().withMessage("El diseño no puede estar vacio"),
    check('fk_artist').not().isEmpty().withMessage("El artista no puede estar vacio"),
    check('price').not().isEmpty().withMessage("El precio no puede estar vacio"),
    check('image').custom((value, {req}) => {
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            if (typeof req.file == 'undefined'){
              throw new Error ("El campo de imagen no puede estar vacio")
              
            } else if (req.file.originalname) {
              let fileExtension = path.extname(req.file.originalname);
              let extensionIsOk = acceptedExtensions.includes(fileExtension);
              if (!extensionIsOk) {
                throw new Error('Los formatos válidos de la imagen de perfil son JPG, JPEG y PNG');
              }
            }
            return true;
            }),
], productsController.update);


//ELIMINAR PRODUCTOS
router.delete('/delete/:productId', adminMiddleware, productsController.destroy); 


//DETALLE DE PRODUCTOS
router.get('/:productId/', productsController.detail);


module.exports = router;
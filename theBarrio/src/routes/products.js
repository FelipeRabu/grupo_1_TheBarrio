// ************ Require's ************
const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator'); //Express validator para validar el back
const path = require('path');
const multer = require('multer');

// ************ Controller Require ************

const productsController = require('../controllers/productsController');

//Para poder guardar las imagenes que sube el usuario
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

//Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
/*const db = require('../database/models')
const sequelize = db.sequelize*/


router.get('/', productsController.root); /* GET - All products */
   

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); /* GET - Form to create */ // es .create ?


router.post('/create/',upload.single('image'),[
    /*** VALIDACION BACK ***/ 
    check('name').not().isEmpty().withMessage("El nombre no puede estar vacio"),
    check('name').isLength({min:5}).withMessage("El nombre debe tener 5 caracteres"),
    check('image').not().isEmpty().withMessage("El campo de imagen no puede estar vacio"),
    
    check('image').custom(function(inputValue){
    
    
            console.log("===============esta es la imagen que carga el usuario=====================");
            console.log(inputValue);
            console.log("====================================");
          
            //Almacenamos la extension como string en una variable
            let imageProductExtension = inputValue.substring(inputValue.lastIndexOf('.') + 1).toLowerCase()

            if ((imageProductExtension != "jpg" && imageProductExtension != "png" && imageProductExtension != "gif" && imageProductExtension != "jpeg")) {
              return false;
            }
      
    }),
    check('fk_category').not().isEmpty().withMessage("El categoria no puede estar vacia"),
    check('fk_color').not().isEmpty().withMessage("El color no puede estar vacio"),
	  check('fk_size').not().isEmpty().withMessage("El talle no puede estar vacio"),
	  check('fk_design').not().isEmpty().withMessage("El diseño no puede estar vacio"),
    check('fk_artist').not().isEmpty().withMessage("El artista no puede estar vacio"),
    check('price').not().isEmpty().withMessage("El precio no puede estar vacio"),
    //check('discount').not().isEmpty().withMessage("El campo no puede estar vacio")
  
]
,productsController.store); /* POST 
- Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
router.post('/edit/:productId', productsController.update); /* PUT - Update in DB */
/* CAMBIAR EL POST DE ARRIBA POR UN PUT */

/*** DELETE ONE PRODUCT ***/ 
router.post('/delete/:productId', productsController.destroy); /* DELETE - Delete from DB */
//CAMBIAR ESTO A "delete" EN VEZ DE "post"

router.get('/:productId/', productsController.detail); /* GET - Product detail */

module.exports = router;
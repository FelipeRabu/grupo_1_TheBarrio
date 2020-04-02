// ========== REQUIRE ==========
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check, validationResult, body} = require('express-validator'); //Express validator para validar el back

// ========== CONTROLADOR ==========
const usersController = require('../controllers/usersController');

// ========== MULTER ==========
//Para poder guardar las imagenes que sube el usuario (Ej foto de perfil)
const diskStorage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, path.join(__dirname, '../../public/images/avatars'));
	},
	filename: function(req, file, cb){
		let userName = req.body.first_name.replace(/ /g, '_').toLowerCase();
		let imageFinalName = userName + '_' + Date.now() + path.extname(file.originalname);
		cb(null, imageFinalName);
	}
});
const upload = multer({ storage: diskStorage });

// ========== SEQUELIZE ========== Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
const db = require('../database/models')
//const sequelize = db.sequelize


// ========== MIDDLEWARES ==========
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');



// ========== RUTAS DE USUARIOS ==========

//FORMULARIO DE REGISTRO
router.get('/register', guestMiddleware, usersController.register);

//PROCESO DE REGISTRO
router.post('/register', upload.single('avatar'), [
	check('first_name').trim().isLength({min:2}).withMessage("El nombre debe tener como minimo 2 caracteres"),
	check('last_name').trim().isLength({min:2}).withMessage("El apellido debe tener como minimo 2 caracteres"),
	check('email').isEmail().withMessage("Tiene que ser un email valido"),
	check('password').trim().isLength({min:8}).withMessage("La constraseña debe tener como minimo 8 caracteres"),
	check('email').custom(function(value){
		return db.Users
			.findAll({
				where: {
					email: value
				}
			})
			.then(user => { 
				if (user.length>0) {
					//return Promise.reject('Ya existe un usuario con ese email');
					throw new Error('Ya existe un usuario con ese email');
				}
            })
	}),
	check('avatar').custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
			if (typeof req.file == 'undefined') {
				throw new Error('Elegí una imagen de perfil');
			} else if (req.file.originalname) {
				let fileExtension = path.extname(req.file.originalname);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos de la imagen de perfil son JPG, JPEG y PNG');
				}
			}
			return true;
	}),
], usersController.store);

// LOGIN
router.get('/login', guestMiddleware, usersController.login);

// PROCESO DE LOGIN
router.post('/login', [
			check('email').isEmail().withMessage("Tiene que ser un formato de email valido"),
			check('email').not().isEmpty().withMessage("No ingresaste un email"),
			check('password').not().isEmpty().withMessage("No ingresaste una contraseña"),
], usersController.processLogin);

//LOGOUT
router.get('/logout', usersController.logout);

//LIST
router.get('/list', authMiddleware, usersController.list);

//PERFIL
router.get('/profile', authMiddleware, usersController.profile);

//EDITAR
router.get('/edit/:userId', usersController.edit); 
router.put('/edit/:userId', usersController.update);

//ELIMINAR 
router.delete('/delete/:userId', usersController.destroy);

module.exports = router;
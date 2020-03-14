// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, path.join(__dirname, '../../public/images/avatars'));
	},
	filename: function(req, file, cb){
		let userName = req.body.full_name.replace(/ /g, '_').toLowerCase();
		let imageFinalName = userName + '_'+ Date.now() + path.extname(file.originalname);
		cb(null, imageFinalName);
	}
});

const upload = multer({ storage: diskStorage });

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


// ========= RUTAS DE USUARIOS =========

//REGISTER
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', usersController.store);  // para enviar informacion pormedio de la pagina de registro

//LOGIN
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.processLogin);  //para pedir visualizar login

//LOGOUT
router.get('/logout', usersController.logout);

//LIST
router.get('/list', usersController.list);

//PERFIL
router.get('/profile', authMiddleware, usersController.profile);

//EDITAR
router.get('/edit/:userId', usersController.edit); 
router.post('/edit/:userId', usersController.update);

//ELIMINAR 
router.post('/delete/:userId', usersController.destroy);

module.exports = router;
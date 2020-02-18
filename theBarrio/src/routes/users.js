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
//const authMiddleware = require('../middlewares/authMiddleware');
//const guestMiddleware = require('../middlewares/guestMiddleware');


// ========= RUTAS DE USUARIOS =========

router.get('/register', usersController.register);  //para pedir visualizar registro
 
router.post('/register', usersController.store);  // para enviar informacion pormedio de la pagina de registro
 
router.get('/login', usersController.login);  //para pedir visualizar login

router.get('/list', usersController.list);

/*** PERFIL DEL USUARIO ***/ 
router.get('/profile/:userId', usersController.profile); 

/*** EDITAR UN USUARIO ***/ 
router.get('/edit/:userId', usersController.edit); 
router.post('/edit/:userId', usersController.update);

/*** ELIMINAR UN USUARIO ***/ 
router.post('/delete/:userId', usersController.destroy);




// ================ DE ACA PARA ABAJO ES CODIGO VIEJO (Carlos) ================

//users/registro
router.get('/', function(req, res){
    res.send('hola todos');
});
<<<<<<< HEAD
 
router.get('/register', userController.register);  //para pedir visualizar registro
 
router.post('/register', userController.create);  // para enviar informacion pormedio de la pagina de registro
 
/*----------LOGIN---------------*/
router.get('/login', userController.login);  //para pedir visualizar login
/*
Router.post('/login', [
   check('email').isEmail().withMessage('Email es invalido')
   check('password').islenght({min:8}).withMessage('La contraseña debe tenner almenos 8 caracteres')

], userController.processLogin);
*/
=======
>>>>>>> 84f62d127a040c6b980eb8a5775ac16475f7a70b

//router.get('/search', usersController.search);

//router.get('/edit/:idUser', usersController.edit);

//-------------------------------------------------------------------------------------


router.put('/edit', function (req,res){
    res.send("fui por put");
});

router.delete('/delete/:idUser', function(req,res){
    res.send("soy delete");
});

//PERFIL DEL USUARIO
router.get('/profile', usersController.profile);


module.exports = router;
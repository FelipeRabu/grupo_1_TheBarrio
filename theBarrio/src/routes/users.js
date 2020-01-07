const express = require("express");
const userController = require('../controllers/userController.js');

const router = express.Router();



//users/registro
router.get('/', function(req, res){
    res.send('hola todos');
});

 
router.get('/register', userController.register);  //para pedir visualizar registro
 
router.post('/register', userController.create);  // para enviar informacion pormedio de la pagina de registro
  

router.get('/login', userController.login);  //para pedir visualizar login

router.get('/list', userController.list); 

router.get('/search', userController.search);

router.get('/edit/:idUser', userController.edit);
//-------------------------------------------------------------------------------------


router.put('/edit', function (req,res){
    res.send("fui por put");
});

router.delete('/delete/:idUser', function(req,res){
    res.send("soy delete");
});




module.exports = router;
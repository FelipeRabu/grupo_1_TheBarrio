const fs =  require('fs');
const path =  require('path');   
const bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator'); //Express validator para validar el back


// Constants
const userFilePath = path.join(__dirname, '../data/users.json');

//Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
const db = require('../database/models')
//const sequelize = db.sequelize

const usersController = {
    
    //FORMULARIO DE REGISTRO
    register: (req, res) => {        
		res.render('register');
    },

    //ALMACENAR NUEVO USUARIO
    store: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {

            // Hash del password
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            
            // Asignar el nombre final de la imagen
            req.body.avatar = req.file.filename;
            
            db.Users
                .create(req.body)
                .then( () => res.redirect('/') )
                .catch(
                    error => {
                        console.log(error)
                        return res.redirect('/users/register')
                    }
                )
        } else {
		    res.render('register', {errors: errors.errors});
        }
    },

    //FORMULARIO DE LOGIN
    login: (req, res) => {        
		res.render('login');
    },

    //PROCESO DE LOGIN
    processLogin: (req, res) => {

        let errors = validationResult(req)
        if (errors.isEmpty()) {

            db.Users
                .findOne({
                    where: {
                        email: req.body.email,
                    }
                }) 
                .then(userLogin => {      
                    if (userLogin != undefined) {
                        
                        // Al ya tener al usuario, comparamos las contraseñas
                        if (bcrypt.compareSync(req.body.password, userLogin.password)) {
                            
                            // Setear en session el ID del usuario
                            req.session.userId = userLogin.id_user;
            
                            // Setear la cookie
                            if (req.body.remember_user) {
                                res.cookie('userIdCookie', userLogin.id_user, { maxAge: 60000 * 60 });
                            }
                            
                            // Redireccionamos al visitante a su perfil
                            res.redirect(`/users/profile`);
                        } else {
                            //'Credenciales inválidas'
                            res.render('login', {credentialsPassword: true});
                        }
                    } else {
                        //No hay usuarios registrados con ese email
                        res.render('login', {credentialsEmail: true});
                    }
                })
                .catch(error => console.log(error));    
        } else {
		    res.render('login', {errors: errors.errors});
        }              
    },

    //PERFIL DEL USUARIO
    profile: (req, res) => {
            let idSession = req.session.userId
            db.Users
                .findByPk(idSession)
                .then(userLogin => { 
                    res.render('userProfile', { userLogin })
                })
                .catch(error => console.log(error));
    },

    //LISTADO DE USUARIOS
    list: (req, res) => {  
        db.Users
			.findAll()
			.then(users => {      
                res.render('userList', { users })
            })
            .catch(error => console.log(error));
    },

    

    //FORMULARIO PARA EDITAR UN USUARIO
    edit: (req, res) => {
        let idURL = req.params.userId

        db.Users
			.findAll()
			.then(users => {      
                res.render('userEdit', { users, idURL })
            })
            .catch(error => console.log(error));
    },

    //EDITAR UN USUARIO
    update: (req, res) => {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
       db.Users
       .update(
           req.body,
           {
               where: {
                   id_user: req.params.userId
               }
           }
       )
       .then(() => res.redirect('/'))
       .catch(error => console.log(error)); 
    },

    //ELIMINAR UN USUARIO
    destroy : (req, res) => {
        db.Users
			.destroy({
				where: {
					id_user: req.params.userId
				}
			})
			.then(() => res.redirect('/users/list'));
    },

    
    
    //PROCESO DE LOGOUT
    logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
        
        // Destruir la cookie
		res.cookie('userIdCookie', null, { maxAge: 1 });
		return res.redirect('/');
	}

};

module.exports = usersController;
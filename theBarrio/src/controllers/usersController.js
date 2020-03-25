const fs =  require('fs');
const path =  require('path');   
const bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator'); //Express validator para validar el back


// Constants
const userFilePath = path.join(__dirname, '../data/users.json');

//Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
const db = require('../database/models')
const sequelize = db.sequelize

const usersController = {

    // ===================== CODIGO PARA EL CRUD DE USARIOS CON SEQUELIZE (Felipe) =====================
    
    register: (req, res) => {        
		res.render('register');
    },

    login: (req, res) => {        
		res.render('login');
    },

    profile: (req, res) => {
        if (isLogged) {
            let idSession = req.session.userId
            db.Users
                .findByPk(idSession)
                .then(userLogin => { 
                    res.render('userProfile', {userLogin, idSession})
                })
                .catch(error => console.log(error));
        } else {
            res.redirect('/users/login')
        }
    },

    list: (req, res) => {
        if (isLogged) {
            let idSession = req.session.userId
            db.Users
                .findByPk(idSession)
                .then(userLogin => { 
                    db.Users
                        .findAll()
                        .then(users => {      
                            res.render('userList', { users, userLogin })
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        } else {
            res.redirect('/users/login')
        }
    },

    /*
    list: (req, res) => {  
        db.Users
			.findAll()
			.then(users => {      
                res.render('userList', { users })
            })
            .catch(error => console.log(error));
    },
    */

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
                        return res.redirect('/users/login')
                    }
                )
        } else {
		    res.render('register', {errors: errors.errors});
        }
    },

    edit: (req, res) => {
        let idURL = req.params.userId

        db.Users
			.findAll()
			.then(users => {      
                res.render('userEdit', { users, idURL })
            })
            .catch(error => console.log(error));
    },

    update: (req, res) => {
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

    destroy : (req, res) => {
        db.Users
			.destroy({
				where: {
					id_user: req.params.userId
				}
			})
			.then(() => res.redirect('/'));
    },

    processLogin: (req, res) => {

        console.log("====================ERRORES DEL LOGIN=======================")
        console.log(validationResult(req))
        console.log("===========================================")


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

                                console.log("====================REMEBER USER=======================")
                                console.log(req.body.remember_user)
                                console.log("===========================================")
                        

                                res.cookie('userIdCookie', userLogin.id_user, { maxAge: 60000 * 60 });

                            }
                            
                            // Redireccionamos al visitante a su perfil
                            res.redirect(`/users/profile`);
                        } else {
                            res.send('Credenciales inválidas');
                        }
                    } else {
                        res.send('No hay usuarios registrados con ese email');
                    }
                })
                .catch(error => console.log(error));    
        } else {
		    res.render('login', {errors: errors.errors});
        }              
    },
    
    logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
        
        // Destruir la cookie
		res.cookie('userIdCookie', null, { maxAge: 1 });
		return res.redirect('/');
	}

};

module.exports = usersController;
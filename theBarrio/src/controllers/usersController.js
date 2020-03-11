const fs =  require('fs');
const path =  require('path');   
const bcrypt = require('bcrypt');

// Constants
const userFilePath = path.join(__dirname, '../data/users.json');

//Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
const db = require('../database/models')
const sequelize = db.sequelize


const usersController = {

    // ===================== CODIGO PARA EL CRUD DE USARIOS CON SEQUELIZE (Felipe) =====================
    
    register: (req, res) => {        
        res.render('register')
    },

    login: (req, res) => {        
        res.render('login')
    },

    profile: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        if (isLogged) {
            let idSession = req.session.userId
            db.Users
                .findByPk(idSession)
                .then(userLogin => { 
                    res.render('userProfile', { userLogin, idSession, isLogged })
                })
                .catch(error => console.log(error));
        } else {
            res.redirect('/users/login')
        }
        
    },

    list: (req, res) => {  
        db.Users
			.findAll()
			.then(users => {      
                res.render('userList', { users })
            })
            .catch(error => console.log(error));
    },

    store: (req, res) => {
        // Hash del password
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        
        db.Users
            .create(req.body)
            .then( () => res.redirect('/') )
            .catch(
                error => {
                    console.log(error)
                    return res.redirect('/')
                }
            )
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
                        req.session.userId = userLogin.id;
        
                        /*    
                        // Setear la cookie
                        if (req.body.remember_user) {
                            res.cookie('userIdCookie', user.id, { maxAge: 60000 * 60 });
                        }
                        */
        
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
    },
    
    logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
        
        // Destruir la cookie
		//res.cookie('userIdCookie', null, { maxAge: 1 });
		return res.redirect('/');
	}

};

module.exports = usersController;
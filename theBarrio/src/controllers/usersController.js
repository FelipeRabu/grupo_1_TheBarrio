const fs =  require('fs');   // requerimos filesisten
const path =  require('path');   // requerimos filesisten

// Constants
const userFilePath = __dirname + '/../data/users.json';

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
        let idURL = req.params.userId

        db.Users
			.findAll()
			.then(users => {      
                res.render('userProfile', { users, idURL })
            })
            .catch(error => console.log(error));
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
        db.Users
            .create(req.body)
            .then(()=>res.redirect('/'))
            .catch(error => console.log(error))
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

    

    
    // ===================== CODIGO VIEJO (Carlos) =====================
    /*
    register: function (req, res) { 
       
        res.render('register')
   
    },

    login: function (req, res) { 
       
        res.render('login')

    },
    
    list: function (req, res){

        let users =  [
            {id: 1, name:"Dario"},
            {id: 2, name:"Carlos"},
            {id: 3, name:"ramon"},
            {id: 4, name:"chapulin"}
        ];

        res.render('userList', {users: users});

    },

    search: function (req, res){

        let loQueBuscoElUsuario = req.query;
        res.send(loQueBuscoElUsuario);

    },

    create: function(req, res) {
        
        //console.log("Esto viene del formulario ============" + req.body)

        let userContent = fs.readFileSync(userFilePath, 'utf-8')

        let allUsers = userContent == '' ? [] : JSON.parse(userContent)

        console.log("Esto esta en el JSON ============" + allUsers)

        let userId = allUsers.length > 0 ? 1 : allUsers.length + 1

        let newUser = {
            id:userId,
            ...req.body
        }

        allUsers.push(newUser)

        fs.writeFileSync(userFilePath, allUsers)       
        
        
        
        /*CODIGO DE CARLOS
        
        let usuario ={

            nombre:  req.body.nombre,    // *** req.body ***   nos trae la informacion obtenida en el formulario si agregamos *** nombre *** ( req.body.nombre)
            correo:  req.body.email,
            contraseña: req.body.contraseña
            
        }; 

       //  GUARDARLA
        
       /* let usuarioJSON = JSON.stringify(usuario); // convertimos un objeto literal a string
          fs.writeFileSync('usuarios.json',usuarioJSON); // escribimos con la variable obtenida usuarioJESON y la guardamos en un archivo nuevo llamado  // usuarios.json //
          res.redirect('/users/list');
       */

       /*
        let ubicacionArchivo = path.join(__dirname, '../data/users.json');
        let archivoUsuario = fs.readFileSync(ubicacionArchivo ,{encoding: 'utf-8'});
        let usuarios = [];
        if(archivoUsuario != '') {
            
            usuarios = JSON.parse(archivoUsuario);

        }
        let ultimoUsuario = usuarios[usuarios.length - 1];
        req.body = {
            id: ultimoUsuario.id + 1,
			...req.body
		};

        usuarios.push(req.body);

        usuariosJSON = JSON.stringify(usuarios, null, ' ');
        fs.writeFileSync(ubicacionArchivo, usuariosJSON);
        res.send('¡Creaste tu usuario con éxitooooo!');
        


    },

    edit: function(req,res){
        const idUser = req.params.idUser ;

        const users = [
            {id: 1, name:"Dario"},
            {id: 2, name:"Carlos"},
            {id: 3, name:"ramon"},
            {id: 4, name:"chapulin"}
        ];

        const userToEdit = users[idUser];
        res.render('userEdit', {userToEdit : userToEdit});
    },
    */
   

};

module.exports = usersController;
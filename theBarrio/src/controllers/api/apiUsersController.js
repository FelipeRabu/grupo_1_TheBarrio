const db = require('../../database/models')
const sequelize = db.sequelize

const apiUserController = {

    // ------------ listado de los usuarios--------------------

    list: (req , res) => {
        db.Users
            .findAll()
            .then(function(users) {
               
            
             // Arma un nuevo objeto literal con informacion de los productos
             let newUsers = []
             users.forEach(oneUser => {
                 oneUser.setDataValue("detail", "http://localhost:3000/api/users/" + oneUser.id_user)
                 let newUser = {
                     id: oneUser.id_user,
                     name: oneUser.first_name + ' ' + oneUser.last_name,
                     email: oneUser.email,
                     detail: oneUser.get('detail') //Cuando hago un setDataValue es una propiedad privada. No se puede acceder con un punto (.), hay que acceder con get
                 }
                 newUsers.push(newUser)

             })

               // Arma un obj literal con lo que se envia en la API
               let apiResponse = {
                count: users.length,
                users: newUsers,
            }    

            //envio la info
            res.send(apiResponse)
        })
            .catch(error => console.log(error))
    },


// -------detalle para unico produco ---------
        detail: (req, res) => {

         db.Users
         .findByPk(req.params.userId)
         .then(oneUser =>{
                // agrega la URL de la imagen del usuario
            oneUser.setDataValue('image', 'http://localhost:3000/images/avatars/' + oneUser.avatar)

            let newUser = {
                id: oneUser.id_user,
                name: oneUser.first_name,
                lastName: oneUser.last_name,
                email: oneUser.email,
                image: oneUser.get('image')
            }

            res.send(newUser)
         })

         .catch(error => console.log(error));
         

        }      
};






module.exports = apiUserController;
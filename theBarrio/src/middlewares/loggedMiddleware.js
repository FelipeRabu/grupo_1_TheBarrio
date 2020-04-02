function loggedMiddleware (req, res, next) {
    
    //Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
    const db = require('../database/models')
    const sequelize = db.sequelize

    res.locals.isLogged = req.session.userId ? true : false;
    res.locals.isAdmin = false;


    if (res.locals.isLogged == true) {

        db.Users
                .findByPk(req.session.userId)
                .then(userLogin => { 
                    res.locals.userLogin = userLogin
                    
                    if(userLogin.email === "admin@thebarrio.com") {
                        res.locals.isAdmin = true
                    }
                    
                        })
                .catch(error => console.log(error));
    }
	
	next();
}
module.exports = loggedMiddleware;
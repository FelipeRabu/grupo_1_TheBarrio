function adminMiddleware (req, res, next) {
    
    /*
    if (req.locals.isAdmin == false) {
		return res.send('No tenes acceso a esto');
    }
    */
   const db = require('../database/models')

   if(req.session.userId) {
        
        db.Users
            .findByPk(req.session.userId)
            .then(userLogin => { 

                if(userLogin.email === "admin@thebarrio.com") {
                    isAdmin = true
                    console.log("ENTRE AL IF")
                } else {
                    console.log("ENTRE AL ELSE")
                    return res.send('No tenes acceso a esto')
                }
                    })
            .catch(error => console.log(error));
    
    } else {
        return res.send('No tenes acceso a esto')
    }
    

	next();
}

module.exports = adminMiddleware;
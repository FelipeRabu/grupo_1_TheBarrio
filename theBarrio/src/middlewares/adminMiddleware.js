function adminMiddleware (req, res, next) {
    
   const db = require('../database/models')

   if(req.session.userId) {
        
        db.Users
            .findByPk(req.session.userId)
            .then(userLogin => { 

                if(userLogin.email === "admin@thebarrio.com") {
                    //Usuario admin
                    isAdmin = true
                    
                } else {
                    //Usuario sin permisos de admin
                    return res.redirect('/products')
                }
                    })
            .catch(error => console.log(error));
    
    } else {
        //Usuario sin permisos de admin
        return res.redirect('/products')
    }
    
	next();
}
module.exports = adminMiddleware;
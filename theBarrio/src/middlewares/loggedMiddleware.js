function loggedMiddleware (req, res, next) {

    //console.log("============================ENTRE AL BLAMIDDLWARE===================")

    res.locals.isLogged = req.session.userId ? true : false;
	
	next();
}
module.exports = loggedMiddleware;
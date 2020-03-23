function loggedMiddleware (req, res, next) {

    res.locals.isLogged = req.session.userId ? true : false;
	
	next();
}
module.exports = loggedMiddleware;
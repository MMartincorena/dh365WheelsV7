const User = require('../dataBase/models/User');

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    const emailCookie = req.cookies.userEmail;

    //let userCookie = User.findByField('email', emailCookie);

   /* if(userCookie){
        req.session.userLogged = userCookie;
    }*/
    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}
module.exports = userLoggedMiddleware;
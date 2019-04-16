// middleware para el inicio de session
var requiresLogin = function(req,res,next){
    if (req.session && req.session.userId){
        return next();
    }
    else{
        var err = new Error ("Tiene que estar logiado para ver esta pagina..");
        err.status = 401;
        return next(err);
    }
}
module.exports= requiresLogin;
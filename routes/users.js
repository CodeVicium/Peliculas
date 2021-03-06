var express = require('express');
var router = express.Router();
var requiresLogin = require('./requireslogin');
var User = require ('../models/user');

/* GET users listing. */
router.get('/',requiresLogin, function(req, res, next) {
 
  // res.send('respond with a resource');
  res.render('login',{ title:"Login de Usuario."});
});

//escucho el post de mi pagina de login 
router.post('/',function(req,res,next){
// confirmo los datos del usuario
if  (req.body.password != req.body.passwordConf){
  var err = new Error ("Las password no coinciden");
  err.status = 401;
  return next(err);
}
//detecto si estoy registrando un usuario
if (req.body.email && req.body.username && req.body.password && req.body.passwordConf){
  var userData={
    email: req.body.email,
    username:req.body.username,
    password:req.body.password,
    passwordConf:req.body.passwordConf
  };
  User.create(userData,function(err,user){
    if(err){
     return next(err);
    } else {
      req.session.userId = user._id;
      return res.redirect('/');
    }
  });
}
// si estoy logiando el usuario
else if(req.body.logemail && req.body.logpassword){
  User.authenticate(req.body.logemail,req.body.logpassword,function(err,user){
    if(err || !user){
        if(err)return next(err);
        var error = new Error("No existe un usuerio o clave incorrecta");
        error.status=401;
        return next(error);
    }
    else{
      req.session.userId = user._id;
      return res.redirect('/');
    }
  });
}
});

router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.redirect('/login');
});
module.exports = router;

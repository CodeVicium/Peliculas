var express = require('express');
var router = express.Router();
var requiresLogin= require ('./requireslogin');

/* GET home page. */
router.get('/',requiresLogin , function(req, res, next) {
  res.render('index', { title: 'Express',logged:req.session.userId,movies:[],recPerPage:5,currentPage:1,cantPages:5 });
});

router.get('/login',function(req,res,next){
res.render("login",{title: "Login",logged:(req.session && req.session.userId)});
});

module.exports = router;

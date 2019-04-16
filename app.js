var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bluebird= require ('bluebird');
// librerias para el manejo de session con mongo
var session = require ('express-session');
var mongostore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//conectar con mongodb

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect("mongodb://localhost:27017/movieapp",{useNewUrlParser:true,promiseLibrary:bluebird});
// tomo la conexion en una variable 
var db = mongoose.connection;
//seteo eventos de coneccion
db.on("error",console.error.bind(console,"conection error"));
db.once("open",function(){
  console.log("conectado a mongo en el puerto 27017/movieapp");
});
//uso la session 
app.use(session({
  secret:"peliculas2019ezecode",
  resave:true,
  saveUninitialized:false,
  cookie:{maxAge: 30*60*1000},//media hora y expira
  store: new mongostore({mongooseConnection:db})
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
